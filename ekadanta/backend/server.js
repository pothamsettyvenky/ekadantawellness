require("dotenv").config();

console.log("Server Starting...");

const express = require("express");

const app = express();

app.use(express.json());

const {
  sendReminderEmail
} = require(
  "./services/emailServices"
);

try {

  require("./cron/reminderCron");

  console.log(
    "Cron Loaded..."
  );

} catch (error) {

  console.error(
    "Cron Error:",
    error
  );

}

app.get("/", (req, res) => {

  res.send(
    "Ekadantha Backend Running"
  );

});

/*
  TEMPORARY TEST ROUTE
*/

app.get(
  "/test-email",
  async (
    req,
    res
  ) => {

    try {

      const result =
        await sendReminderEmail(

          "pothamsettyvenky003@gmail.com",

          "Test User"

        );

      console.log(
        "Email Test Success:",
        result.messageId
      );

      res.send(
        "Email Sent Successfully"
      );

    } catch (error) {

      console.error(
        "Email Test Error:",
        error
      );

      res.status(500).send(
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