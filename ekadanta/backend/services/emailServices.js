const { Resend } = require("resend");

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const sendReminderEmail = async (
  email,
  name
) => {

  const response =
    await resend.emails.send({

      from:
        "onboarding@resend.dev",

      to: email,

      subject:
        "New Consultation Dates Available",

      html: `
        <h2>Hello ${name}</h2>

        <p>
          New consultation dates are now available.
        </p>

        <p>
          Please book your slot at your earliest convenience.
        </p>

        <br/>

        <p>
          Thanks,</p>

        <p>
          Ekadantha Homoeopathy Clinic
        </p>
      `
    });

  console.log(
    "Resend Response:",
    response
  );

  return response;

};

module.exports = {
  sendReminderEmail
};