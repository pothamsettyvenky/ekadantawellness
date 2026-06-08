const nodemailer = require("nodemailer");

const transporter =
  nodemailer.createTransport({

    host: "smtp.gmail.com",

    port: 587,

    secure: false,

    auth: {

      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS

    }

  });

transporter.verify(
  function (
    error,
    success
  ) {

    if (error) {

      console.error(
        "SMTP Error:",
        error
      );

    } else {

      console.log(
        "SMTP Ready"
      );

    }

  }
);

const sendReminderEmail =
  async (
    email,
    name
  ) => {

    const info =
      await transporter.sendMail({

        from:
          process.env.EMAIL_USER,

        to: email,

        subject:
          "New Consultation Dates Available",

        html: `

          <h2>
            Hello ${name}
          </h2>

          <p>
            New consultation dates are now open.
          </p>

          <p>
            Please book your slot at your earliest convenience.
          </p>

          <br/>

          <p>
            Thanks,
          </p>

          <p>
            Ekadantha Homoeopathy Clinic
          </p>

        `
      });

    console.log(
      "Message ID:",
      info.messageId
    );

    return info;

  };

module.exports = {
  sendReminderEmail
};