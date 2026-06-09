const cron = require("node-cron");

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

cron.schedule(

  "0 9 * * *",

  async () => {

    console.log(
      "Checking Follow Up Reminders..."
    );

    try {

      const snapshot =
        await db
          .collection(
            "appointments"
          )
          .get();

      const today =
        new Date();

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

        if (
          patient.reminderSent
        ) {
          continue;
        }

        let appointmentDate;

        if (
          patient.createdAt
        ) {

          appointmentDate =
            patient.createdAt.toDate();

        } else {

          continue;

        }

        const diffDays =
          Math.floor(

            (
              today -
              appointmentDate
            ) /

            (
              1000 *
              60 *
              60 *
              24
            )

          );

        console.log(

          patient.email,

          "Days:",

          diffDays

        );

        if (
          diffDays >= 1
        ) {

          try {

            await sendReminderEmail(

              patient.email,

              patient.name ||
              "Patient"

            );

            await doc.ref.update({

              reminderSent:
                true,

              reminderSentAt:
                new Date()

            });

            console.log(

              "Reminder Sent:",

              patient.email

            );

          } catch (
            error
          ) {

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
        "Cron Error:",
        error
      );

    }

  },

  {
    timezone:
      "Asia/Kolkata"
  }

);