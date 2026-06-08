const cron =
  require("node-cron");

console.log(
  "Before Listen..."
);

const { db } =
  require("../firebaseAdmin");

const {
  sendReminderEmail
} = require(
  "../services/emailServices"
);

cron.schedule(

  "* * * * *",

  async () => {

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

        console.log(
          "Patient Email:",
          patient.email
        );

        if (
          patient.email
        ) {

          try {

            const result =
              await sendReminderEmail(

                patient.email,

                patient.name ||
                "Patient"

              );

            console.log(
              "Email Sent:",
              patient.email
            );

            console.log(
              result.messageId
            );

          } catch (
            emailError
          ) {

            console.error(
              "Email Error:",
              emailError
            );

          }

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

console.log(
  "Reminder Cron Started"
);