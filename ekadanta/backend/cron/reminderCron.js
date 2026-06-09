const cron =
  require("node-cron");

const { db } =
  require("../firebaseAdmin");

const {
  sendReminderEmail
} = require(
  "../services/emailServices"
);

console.log(
  "Reminder Cron Started"
);

cron.schedule("0 9 */15 * *", async () => {

    console.log(
      "Checking Doctor Notes..."
    );

    try {

      const snapshot =
        await db
          .collection(
            "appointments"
          )
          .get();

      console.log(
        "Appointments Found:",
        snapshot.size
      );

      for (
        const doc of snapshot.docs
      ) {

        const patient =
          doc.data();

        if (
          !patient.email
        ) {

          continue;

        }

        try {

          const result =
            await sendReminderEmail(

              patient.email,

              patient.name ||
              "Patient"

            );

          console.log(
            "Email Sent For:",
            patient.email
          );

          console.log(
            result.data
          );

        } catch (
          error
        ) {

          console.error(

            `Email Failed For ${patient.email}`,

            error.message

          );

        }

      }

    } catch (error) {

      console.error(
        "Firestore Error:",
        error
      );

    }

  },

  {
    timezone:
      "Asia/Kolkata"
  }

);