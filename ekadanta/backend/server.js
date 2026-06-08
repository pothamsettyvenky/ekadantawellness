require("dotenv").config();

console.log("Server Starting...");

const express = require("express");

const app = express();

app.use(express.json());

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