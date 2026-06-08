const nodemailer =
  require("nodemailer");

const transporter =
  nodemailer.createTransport({

    service: "gmail",

    auth: {
      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS
    }

  });

const sendReminderEmail =
  async (
    email,
    name
  ) => {

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

  };

module.exports = {
  sendReminderEmail
};