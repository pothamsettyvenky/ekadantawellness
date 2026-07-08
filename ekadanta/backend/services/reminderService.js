const { db } = require("../firebaseAdmin");
const { sendReminderEmail } = require("./emailServices");

const processReminders = async () => {
  console.log("Checking Follow Up Reminders...");

  try {
    const snapshot = await db
      .collection("appointments")
      .where("paymentStatus", "==", "paid")
      .where("followUpEligible", "==", true)
      .get();

    const today = new Date();

    for (const doc of snapshot.docs) {
      const patient = doc.data();

      if (!patient.email) continue;
      if (!patient.createdAt) continue;

      // Use last reminder date if exists, otherwise use appointment creation date
      const lastReminderDate = patient.reminderSentAt
        ? patient.reminderSentAt.toDate()
        : patient.createdAt.toDate();

      const daysSinceLastReminder = Math.floor(
        (today - lastReminderDate) / (1000 * 60 * 60 * 24)
      );

      console.log(
        `${patient.email} — Days since last reminder: ${daysSinceLastReminder}`
      );

      if (daysSinceLastReminder >= 15) {
        try {
          await sendReminderEmail(
            patient.email,
            patient.name || "Patient"
          );

          // Reset the 15-day clock
          await doc.ref.update({
            reminderSent: true,
            reminderSentAt: new Date(),
            reminderCount: (patient.reminderCount || 0) + 1,
          });

          console.log(
            `Reminder #${(patient.reminderCount || 0) + 1} sent to: ${patient.email}`
          );

        } catch (error) {
          console.error("Email failed:", patient.email, error.message);
        }
      }
    }

  } catch (error) {
    console.error("Reminder Error:", error);
  }
};

module.exports = { processReminders };