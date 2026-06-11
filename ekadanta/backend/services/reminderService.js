const { db } = require("../firebaseAdmin");
const { sendReminderEmail } = require("./emailServices");

const processReminders = async () => {
  console.log("Checking Follow Up Reminders...");

  try {
    const snapshot = await db
      .collection("appointments")
      .get();

    const today = new Date();

    for (const doc of snapshot.docs) {
      const patient = doc.data();

      if (!patient.email) continue;

      if (patient.reminderSent) continue;

      if (!patient.createdAt) continue;

      const appointmentDate =
        patient.createdAt.toDate();

      const diffDays = Math.floor(
        (today - appointmentDate) /
        (1000 * 60 * 60 * 24)
      );

      console.log(
        patient.email,
        "Days:",
        diffDays
      );

      // CHANGE THIS BACK TO 15 LATER
      if (diffDays >= 1) {
        try {
          await sendReminderEmail(
            patient.email,
            patient.name || "Patient"
          );

          await doc.ref.update({
            reminderSent: true,
            reminderSentAt: new Date(),
          });

          console.log(
            "Reminder Sent:",
            patient.email
          );
        } catch (error) {
          console.error(
            "Email Failed:",
            patient.email,
            error.message
          );
        }
      }
    }
  } catch (error) {
    console.error(
      "Reminder Error:",
      error
    );
  }
};

module.exports = {
  processReminders,
};