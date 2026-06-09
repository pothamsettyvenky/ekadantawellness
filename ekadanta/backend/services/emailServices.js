const { Resend } =
  require("resend");

const resend =
  new Resend(
    process.env.RESEND_API_KEY
  );

const sendReminderEmail =
  async (
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
          `15 Day Follow Up Reminder - ${patientName}`,

        html: `

          <h2>
            Hello ${patientName}
          </h2>

          <p>
            It has been 15 days since your consultation.
          </p>

          <p>
            We would love to support your wellness journey.
          </p>

          <p>
            Please book your follow up appointment.
          </p>

          <br/>

          <p>
            Patient Email:
            ${patientEmail}
          </p>

          <p>
            Ekadantha Homoeopathy Clinic
          </p>

        `

      });

    if (
      response.error
    ) {

      throw new Error(
        response.error.message
      );

    }

    return response;

  };

module.exports = {
  sendReminderEmail
};