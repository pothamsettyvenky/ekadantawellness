const express = require("express");
const crypto = require("crypto");

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
  "With Medication": 2999
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

      await db
        .collection(
          "appointments"
        )
        .add({

          ...appointmentData,

          appointmentType:
            "initial",

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

module.exports =
  router;