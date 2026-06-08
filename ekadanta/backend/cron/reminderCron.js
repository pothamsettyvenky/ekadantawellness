const cron = require("node-cron");
console.log("Before Listen...");
const { db } =
  require("../firebaseAdmin");

const {
  sendReminderEmail
} = require(
  "../services/emailServices"
);

cron.schedule(
  "0 9 * * *",
  async () => {

    console.log(
      "Checking Doctor Notes..."
    );

    try {

      const snapshot =
        await db
          .collection("appointments")
          .get();

      for (
        const doc of snapshot.docs
      ) {

        const patient =
          doc.data();

        if (
          patient.email
        ) {

          await sendReminderEmail(
            patient.email,
            patient.name || "Patient"
          );

          console.log(
            "Email Sent:",
            patient.email
          );

        }

      }

    } catch (error) {

      console.error(error);

    }

  },
  {
    timezone: "Asia/Kolkata"
  }
);

console.log(
  "Reminder Cron Started"
);