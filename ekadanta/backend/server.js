require("dotenv").config();

console.log(
  "Server Starting..."
);

const express =
  require("express");

const app =
  express();

app.use(
  express.json()
);

try {

  require(
    "./cron/reminderCron"
  );

  console.log(
    "Cron Loaded..."
  );

} catch (error) {

  console.error(
    "Cron Error:",
    error
  );

}

app.get(
  "/",
  (req, res) => {

    res.send(
      "Ekadantha Backend Running"
    );

  }
);

const {
  sendReminderEmail
} = require(
  "./services/emailServices"
);

app.get(
  "/test-email",
  async (
    req,
    res
  ) => {

    try {

      await sendReminderEmail(

        "test@gmail.com",

        "Test User"

      );

      res.send(
        "Email Sent Successfully"
      );

    } catch (
      error
    ) {

      console.error(
        error
      );

      res
        .status(500)
        .send(
          error.message
        );

    }

  }
);

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  () => {

    console.log(
      `Server Running On Port ${PORT}`
    );

  }
);