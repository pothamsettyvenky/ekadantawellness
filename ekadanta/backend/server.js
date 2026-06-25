require("dotenv").config();

console.log("Server Starting...");
console.log("ENV:", process.env.NODE_ENV);
console.log("CASHFREE APP ID:", process.env.CASHFREE_APP_ID ? "✓ Set" : "✗ Missing");
console.log("CASHFREE SECRET:", process.env.CASHFREE_SECRET_KEY ? "✓ Set" : "✗ Missing");

const express = require("express");
const cors = require("cors");

const paymentRoutes = require("./routes/paymentRoutes");
const followupRoutes = require("./routes/followupRoutes");
const { sendReminderEmail } = require("./services/emailServices");
const { processReminders } = require("./services/reminderService");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ekadantha Backend Running");
});

app.get("/test-email", async (req, res) => {
  try {
    await sendReminderEmail("test@gmail.com", "Test User");
    res.send("Email Sent Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get("/run-reminders", async (req, res) => {
  try {
    console.log("Reminder API Triggered");
    await processReminders();
    res.status(200).json({ success: true, message: "Reminders processed successfully" });
  } catch (error) {
    console.error("Reminder API Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.use("/api/followup", followupRoutes);
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});