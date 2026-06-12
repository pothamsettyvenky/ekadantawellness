const express = require("express");
const { db } = require("../firebaseAdmin");

const router = express.Router();

router.post(
  "/check-followup",
  async (req, res) => {
    try {
      const { email } = req.body;

      const snapshot = await db
        .collection("appointments")
        .where("email", "==", email)
        .orderBy("createdAt", "desc")
        .limit(1)
        .get();

      if (snapshot.empty) {
        return res.json({
          status: "new_user"
        });
      }

      const doc = snapshot.docs[0];
      const appointment = doc.data();

      if (
        appointment.followUpEligible &&
        !appointment.freeFollowUpUsed
      ) {
        return res.json({
  status: "free_followup",
  appointmentId: doc.id,

  patientData: {
    name: appointment.name || "",
    phone: appointment.phone || "",
    age: appointment.age || "",
    gender: appointment.gender || ""
  }
});
      }

     return res.json({
  status: "paid_followup",

  patientData: {
    name: appointment.name || "",
    phone: appointment.phone || "",
    age: appointment.age || "",
    gender: appointment.gender || ""
  }
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
module.exports = router;