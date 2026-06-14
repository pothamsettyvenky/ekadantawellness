const express = require("express");
const crypto = require("crypto");
const {
  sendConfirmationEmail,
  sendInvoiceEmail,
  sendDoctorNotification
} = require("../services/emailServices");

const razorpay =
  require("../config/razorpay");

const {
  admin,
  db
} = require("../firebaseAdmin");

const router =
  express.Router();

const packagePrices = {
  "Without Medication": 1499,
  "With Medication": 2999,

  "Follow-Up Without Medication": 1199,
  "Follow-Up With Medication": 2499
};

router.post(
  "/create-order",
  async (req, res) => {

    console.log(
      "Create Order Hit"
    );

    console.log(
      "Body:",
      req.body
    );

    console.log(
      "Key ID:",
      process.env.RAZORPAY_KEY_ID
    );

    try {

      const {
        packageType
      } = req.body;

      const amount =
        packagePrices[
          packageType
        ];

      if (!amount) {

        return res.status(400).json({
          success: false,
          error:
            "Invalid package type"
        });

      }
console.log(
  "Backend Key:",
  process.env.RAZORPAY_KEY_ID
);
      const order =
        await razorpay.orders.create({

          amount:
            amount * 100,

          currency:
            "INR"

        });

      console.log(
        "Order Created:",
        order.id
      );
console.log(
  "Order Created:",
  order
);
      res.json({
        success: true,
        order
      });

    } catch (error) {

      console.error(
        "Create Order Error:",
        error
      );

      res.status(500).json({
        success: false,
        error: error.message
      });

    }

  }
);

router.post(
  "/verify-payment",
  async (req, res) => {

    try {

      const {

        razorpay_order_id,

        razorpay_payment_id,

        razorpay_signature,

        appointmentData

      } = req.body;

      const body =
        razorpay_order_id +
        "|" +
        razorpay_payment_id;

      const expectedSignature =
        crypto
          .createHmac(
            "sha256",
            process.env
              .RAZORPAY_KEY_SECRET
          )
          .update(body)
          .digest("hex");

      if (
        expectedSignature !==
        razorpay_signature
      ) {

        return res
          .status(400)
          .json({
            success: false,
            message:
              "Invalid Signature"
          });

      }

     const docRef = await db
  .collection("appointments")
  .add({

    ...appointmentData,

    appointmentType:
      appointmentData.appointmentType,

    paymentStatus:
      "paid",

    status:
      "confirmed",

    followUpEligible:
      true,

    freeFollowUpUsed:
      false,

    reminderSent:
      false,

    razorpayOrderId:
      razorpay_order_id,

    razorpayPaymentId:
      razorpay_payment_id,

    createdAt:
      admin.firestore.FieldValue.serverTimestamp()

  });

const bookingId = docRef.id;
      

try {
  await sendConfirmationEmail(
    appointmentData.email,
    appointmentData.name,
    appointmentData.packageType,
    appointmentData.amount,
    razorpay_payment_id,
    bookingId
  );

  console.log("Confirmation email sent");
} catch (error) {
  console.error("Confirmation email failed", error);
}

try {
  await sendInvoiceEmail(
     appointmentData,
    razorpay_payment_id,
    bookingId
  );

  console.log("Invoice email sent");
} catch (error) {
  console.error("Invoice email failed", error);
}
try {

  await sendDoctorNotification(
    appointmentData,
    bookingId
  );

  console.log(
    "Doctor notification sent"
  );

} catch (error) {

  console.error(
    "Doctor notification failed",
    error
  );

}

      res.json({
        success: true,
        message:
          "Payment Verified"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error: error.message
      });

    }

  }
);
router.post(
  "/book-free-followup",
  async (req, res) => {

    try {

      const {
        originalAppointmentId,
        appointmentData
      } = req.body;

     const docRef = await db
  .collection("appointments")
  .add({

    ...appointmentData,

    parentAppointmentId:
      originalAppointmentId,

    appointmentType:
      "followup",

    paymentStatus:
      "free",

    amount: 0,

    status:
      "confirmed",

    createdAt:
      admin.firestore.FieldValue.serverTimestamp()

  });

const bookingId = docRef.id;
await sendConfirmationEmail(
  appointmentData.email,
  appointmentData.name,
  "Free Follow-Up",
  0,
  "FREE-FOLLOWUP",
  bookingId

);
await sendInvoiceEmail(
  {
    ...appointmentData,
    amount: 0,
    packageType: "Free Follow-Up"
  },
  "FREE-FOLLOWUP",
  bookingId
);
await sendDoctorNotification(
  {
    ...appointmentData,
    packageType: "Free Follow-Up"
  },
  bookingId
);

      await db
        .collection("appointments")
        .doc(
          originalAppointmentId
        )
        .update({

          freeFollowUpUsed: true

        });

      res.json({
        success: true
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        error: error.message
      });

    }

  }
);

module.exports =
  router;