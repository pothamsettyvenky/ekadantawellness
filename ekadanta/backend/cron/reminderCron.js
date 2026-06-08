cron.schedule("* * * * *", async () => {

  console.log("Checking Doctor Notes...");

  try {

    const snapshot = await db
      .collection("appointments")
      .get();

    console.log(
      "Appointments Found:",
      snapshot.size
    );

    for (const doc of snapshot.docs) {

      const patient = doc.data();

      console.log(
        "Patient Email:",
        patient.email
      );

      if (patient.email) {

        try {

          await sendReminderEmail(
            patient.email,
            patient.name || "Patient"
          );

          console.log(
            "Email Sent:",
            patient.email
          );

        } catch (emailError) {

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

});