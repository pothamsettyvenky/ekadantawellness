const { Resend } = require("resend");
const {
  generateInvoicePDF
} = require("./pdfService");
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
        "Ekadantha Wellness <appointments@ekadanthawellness.com>",

      to:
        patientEmail,

      subject:
        "15 Day Follow Up Reminder",

      html: `
        <h2>Hello ${patientName}</h2>

        <p>
          It has been 15 days since your consultation.
        </p>

        <p>
          Please schedule your follow-up appointment.
        </p>

        <p>
          Ekadantha Wellness
        </p>
      `
    });

  return response;
};
const sendDoctorNotification = async (
  appointmentData,
  bookingId
) => {

  return resend.emails.send({

    from:
      "Ekadantha Wellness <appointments@ekadanthawellness.com>",

    to:
      "ekadanthawellness@gmail.com",

    subject:
      "New Appointment Booked",

    html: `
      <h2>New Appointment</h2>

      <p><b>Name:</b> ${appointmentData.name}</p>

      <p><b>Phone:</b> ${appointmentData.phone}</p>

      <p><b>Email:</b> ${appointmentData.email}</p>

      <p><b>Date:</b> ${appointmentData.date}</p>

      <p><b>Time:</b> ${appointmentData.slot}</p>

      <p><b>Package:</b> ${appointmentData.packageType}</p>

      <p><b>Booking ID:</b> ${bookingId}</p>
    `
  });

};

const sendConfirmationEmail = async (
  patientEmail,
  patientName,
  packageType,
  amount,
  paymentId,
  bookingId
) => {

  const response =
    await resend.emails.send({

      from:
        "Ekadantha Wellness <appointments@ekadanthawellness.com>",

      to:
        patientEmail,

      subject:
        "Appointment Booking Confirmation",

      html: `
        <h2>Hello ${patientName}</h2>

        <p>
          Your appointment has been booked successfully.
        </p>

        <p>
          <b>Package:</b>
          ${packageType}
        </p>

        <p>
          <b>Amount Paid:</b>
          ₹${amount}
        </p>

        <p>
          <b>Payment ID:</b>
          ${paymentId}
        </p>
         <p>
          <b>Booking ID:</b>
          ${bookingId}
        </p>

        <p>
          You are eligible for one complimentary follow-up consultation within 15 days.
        </p>

        <br/>

        <p>
          Thank you for choosing Ekadantha Wellness.
        </p>
      `
    });
console.log("Confirmation Email Response:", response);
  return response;
};

const sendInvoiceEmail = async (
  appointmentData,
  paymentId,
  bookingId
) => {

  const invoiceNumber =
    "EKW-" +
    Date.now();
const pdfBuffer =
  await generateInvoicePDF(
    appointmentData,
    paymentId,
    bookingId
  );
  const response =
  await resend.emails.send({

    from:
      "Ekadantha Wellness <appointments@ekadanthawellness.com>",

    to:
      appointmentData.email,

    subject:
      `Invoice ${invoiceNumber}`,

    html: `
      <h2>Appointment Confirmed</h2>

      <p>
        Please find your invoice attached.
      </p>
    `,

    attachments: [
      {
        filename:
          `${invoiceNumber}.pdf`,

        content:
          pdfBuffer.toString(
            "base64"
          )
      }
    ]
  });

  return response;
};

module.exports = {
  sendReminderEmail,
  sendConfirmationEmail,
  sendInvoiceEmail,
  sendDoctorNotification
};