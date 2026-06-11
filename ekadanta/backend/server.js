require("dotenv").config();

console.log("Server Starting...");

const express = require("express");

const app = express();

app.use(express.json());

const {
  sendReminderEmail
} = require("./services/emailServices");

const {
  processReminders
} = require("./services/reminderService");

app.get("/", (req, res) => {
  res.send("Ekadantha Backend Running");
});

app.get(
  "/test-email",
  async (req, res) => {
    try {

      await sendReminderEmail(
        "test@gmail.com",
        "Test User"
      );

      res.send(
        "Email Sent Successfully"
      );

    } catch (error) {

      console.error(error);

      res
        .status(500)
        .send(error.message);

    }
  }
);

app.get(
  "/run-reminders",
  async (req, res) => {

    try {

      console.log(
        "Reminder API Triggered"
      );

      await processReminders();

      res.status(200).json({
        success: true,
        message:
          "Reminders processed successfully"
      });

    } catch (error) {

      console.error(
        "Reminder API Error:",
        error
      );

      res.status(500).json({
        success: false,
        error: error.message
      });

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