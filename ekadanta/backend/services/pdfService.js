const PDFDocument = require("pdfkit");
const path = require("path");

const generateInvoicePDF = (appointmentData, paymentId, bookingId) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      margin: 50,
    });

    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));

    doc.on("end", () => {
      resolve(Buffer.concat(buffers));
    });

    const logoPath = path.join(__dirname, "../assets/logo.png");

    // Logo
    doc.image(logoPath, 50, 40, {
      width: 60,
    });

    // Clinic Header
    doc.fontSize(20).text("EKADANTHA WELLNESS", 130, 45);

    doc.fontSize(10).text("Homeopathy Wellness Clinic", 130, 70);

    doc.moveDown(2);

    doc.fontSize(16).text("INVOICE");

    doc.moveDown();

    const invoiceNumber = "EKW-" + Date.now();

    doc.text(`Invoice Number: ${invoiceNumber}`);

    doc.text(`Booking ID: ${bookingId}`);

    doc.text(`Payment ID: ${paymentId}`);

    doc.text(`Date: ${new Date().toLocaleDateString()}`);

    doc.moveDown();

    doc.fontSize(14).text("Patient Details", {
      underline: true,
    });

    doc.moveDown(0.5);

    doc.text(`Name: ${appointmentData.name}`);

    doc.text(`Phone: ${appointmentData.phone}`);

    doc.text(`Email: ${appointmentData.email}`);

    doc.moveDown();

    doc.fontSize(14).text("Appointment Details", {
      underline: true,
    });

    doc.moveDown(0.5);

    doc.text(`Doctor: Dr. Shripriya`);

    doc.text(`Package: ${appointmentData.packageType}`);

    doc.text(`Appointment Date: ${appointmentData.date}`);

    doc.text(`Appointment Time: ${appointmentData.slotTime}`);

    doc.moveDown();

    const amount = appointmentData.amount || 0;

    const status = amount === 0 ? "Complimentary Follow-Up" : "Paid";

    doc.fontSize(14).text("Payment Details", {
      underline: true,
    });

    doc.moveDown(0.5);

    doc.text(`Amount: ₹${amount}`);

    doc.text(`Status: ${status}`);

    doc.moveDown();

    doc.fontSize(12).text("Follow-Up Eligibility", {
      underline: true,
    });

    doc.moveDown(0.5);

    doc.text(
      "This consultation includes one complimentary follow-up consultation within 15 days.",
    );

    doc.moveDown(2);

    doc.text("Phone: +91 825239087");

    doc.text("Email: ekadanthawellness@gmail.com");

    doc.text("www.ekadanthawellness.com");

    doc.end();
  });
};

module.exports = {
  generateInvoicePDF,
};
