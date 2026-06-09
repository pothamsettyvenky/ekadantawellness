const { Resend } = require("resend");

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const sendReminderEmail = async (
  patientEmail,
  patientName
) => {

  const response =
    await resend.emails.send({

      from:
        "Ekadantha Wellness <onboarding@resend.dev>",

      to:
        "ekadanthawellness@gmail.com",

      subject:
        `Reminder Test - ${patientName}`,

      html: `

        <h2>
          Reminder Email Test
        </h2>

        <p>
          Patient Name:
          <strong>${patientName}</strong>
        </p>

        <p>
          Patient Email:
          <strong>${patientEmail}</strong>
        </p>

        <hr/>

        <p>
          New consultation dates are available.
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

  if (response.error) {

    throw new Error(
      response.error.message
    );

  }

  return response;

};

module.exports = {
  sendReminderEmail
};