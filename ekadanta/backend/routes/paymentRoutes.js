const express = require("express");
const {
  sendConfirmationEmail,
  sendInvoiceEmail,
  sendDoctorNotification,
} = require("../services/emailServices");

const cashfree = require("../config/cashfree");
const { admin, db } = require("../firebaseAdmin");

const router = express.Router();

const packagePrices = {
  "Without Medication": 1499,
  "With Medication": 2999,
  "Follow-Up Without Medication": 1199,
  "Follow-Up With Medication": 2499,
};

// ─── CREATE ORDER ─────────────────────────────────────────────────────────────
router.post("/create-order", async (req, res) => {
  console.log("Create Order Hit");
  console.log("Body:", req.body);

  try {
    const { packageType, customerDetails } = req.body;
    const amount = packagePrices[packageType];

    if (!amount) {
      return res.status(400).json({ success: false, error: "Invalid package type" });
    }

    const orderId = `order_${Date.now()}`;

    const orderRequest = {
      order_id: orderId,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: customerDetails?.phone
          ? `cust_${customerDetails.phone}`
          : `cust_${Date.now()}`,
        customer_phone: customerDetails?.phone || "9999999999",
        customer_email: customerDetails?.email || "",
        customer_name: customerDetails?.name || "",
      },
      order_meta: {
        return_url: `${process.env.FRONTEND_URL}/payment-status?order_id={order_id}`,
      },
    };

    const response = await cashfree.PGCreateOrder(orderRequest);
    console.log("Order Created:", response.data.order_id);

    res.json({
      success: true,
      order: {
        id: response.data.order_id,
        payment_session_id: response.data.payment_session_id,
        amount: amount,
      },
    });
  } catch (error) {
    console.error("Create Order Error:", error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error?.response?.data?.message || error.message,
    });
  }
});

// ─── VERIFY PAYMENT ───────────────────────────────────────────────────────────
router.post("/verify-payment", async (req, res) => {
  try {
    const { cashfree_order_id, appointmentData } = req.body;

    // Fetch order status from Cashfree
    const orderResponse = await cashfree.PGFetchOrder(cashfree_order_id);
    const orderStatus = orderResponse.data.order_status;

    if (orderStatus !== "PAID") {
      return res.status(400).json({
        success: false,
        message: `Payment not completed. Status: ${orderStatus}`,
      });
    }

    // ── DUPLICATE PREVENTION ─────────────────────────────────────────────────
    const existingAppointment = await db
      .collection("appointments")
      .where("cashfreeOrderId", "==", cashfree_order_id)
      .get();

    if (!existingAppointment.empty) {
      console.log("Duplicate blocked:", cashfree_order_id);
      return res.json({ success: true, message: "Already processed" });
    }
    // ────────────────────────────────────────────────────────────────────────

    // Get payment ID
    const paymentsResponse = await cashfree.PGOrderFetchPayments(cashfree_order_id);
    const payment = paymentsResponse.data?.[0];
    const cashfreePaymentId = payment?.cf_payment_id || cashfree_order_id;

    // Check slot availability
    const slotDoc = await db
      .collection("slots")
      .doc(appointmentData.slot)
      .get();

    if (!slotDoc.exists) {
      return res.status(400).json({ success: false, message: "Slot not found" });
    }

    if (slotDoc.data().available === false) {
      return res.status(400).json({
        success: false,
        message: "This slot has already been booked.",
      });
    }

    // Save appointment to Firestore
    const docRef = await db.collection("appointments").add({
      ...appointmentData,
      appointmentType: appointmentData.appointmentType,
      paymentStatus: "paid",
      status: "confirmed",
      followUpEligible: true,
      freeFollowUpUsed: false,
      reminderSent: false,
      cashfreeOrderId: cashfree_order_id,
      cashfreePaymentId: cashfreePaymentId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const bookingId = docRef.id;

    console.log("Appointment saved:", bookingId);
    console.log("Slot ID:", appointmentData.slot);
    console.log("Slot Time:", appointmentData.slotTime);

    // Mark slot as booked
    await db
      .collection("slots")
      .doc(appointmentData.slot)
      .update({ available: false });

    // Send emails
    try {
      await sendConfirmationEmail(
        appointmentData.email,
        appointmentData.name,
        appointmentData.packageType,
        appointmentData.amount,
        cashfreePaymentId,
        bookingId
      );
      console.log("Confirmation email sent");
    } catch (err) {
      console.error("Confirmation email failed", err);
    }

    try {
      await sendInvoiceEmail(appointmentData, cashfreePaymentId, bookingId);
      console.log("Invoice email sent");
    } catch (err) {
      console.error("Invoice email failed", err);
    }

    try {
      await sendDoctorNotification(appointmentData, bookingId);
      console.log("Doctor notification sent");
    } catch (err) {
      console.error("Doctor notification failed", err);
    }

    res.json({ success: true, message: "Payment Verified" });

  } catch (error) {
    console.error("Verify Payment Error:", error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error?.response?.data?.message || error.message,
    });
  }
});

// ─── BOOK FREE FOLLOW-UP ──────────────────────────────────────────────────────
router.post("/book-free-followup", async (req, res) => {
  try {
    const { originalAppointmentId, appointmentData } = req.body;

    const slotDoc = await db
      .collection("slots")
      .doc(appointmentData.slot)
      .get();

    if (!slotDoc.exists) {
      return res.status(400).json({ success: false, message: "Slot not found" });
    }

    if (slotDoc.data().available === false) {
      return res.status(400).json({
        success: false,
        message: "This slot has already been booked.",
      });
    }

    const docRef = await db.collection("appointments").add({
      ...appointmentData,
      parentAppointmentId: originalAppointmentId,
      appointmentType: "followup",
      paymentStatus: "free",
      amount: 0,
      status: "confirmed",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const bookingId = docRef.id;

    await db
      .collection("slots")
      .doc(appointmentData.slot)
      .update({ available: false });

    await sendConfirmationEmail(
      appointmentData.email,
      appointmentData.name,
      "Free Follow-Up",
      0,
      "FREE-FOLLOWUP",
      bookingId
    );

    await sendInvoiceEmail(
      { ...appointmentData, amount: 0, packageType: "Free Follow-Up" },
      "FREE-FOLLOWUP",
      bookingId
    );

    await sendDoctorNotification(
      { ...appointmentData, packageType: "Free Follow-Up" },
      bookingId
    );

    await db
      .collection("appointments")
      .doc(originalAppointmentId)
      .update({ freeFollowUpUsed: true });

    res.json({ success: true });

  } catch (error) {
    console.error("Free Followup Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;