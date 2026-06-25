import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function PaymentStatus() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying");
  const navigate = useNavigate();

  useEffect(() => {
    const orderId = searchParams.get("order_id");
    const appointmentData = JSON.parse(
      sessionStorage.getItem("pendingAppointment") || "{}"
    );

    if (!orderId || !appointmentData?.email) {
      setStatus("failed");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(
          "https://ekadantawellness-backend.onrender.com/api/payment/verify-payment",
       {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              cashfree_order_id: orderId,
              appointmentData,
            }),
          }
        );
        const data = await res.json();
        if (data.success) {
          sessionStorage.removeItem("pendingAppointment");
          setStatus("success");
          setTimeout(() => navigate("/"), 3000);
        } else {
          setStatus("failed");
        }
      } catch (err) {
        console.error(err);
        setStatus("failed");
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5" }}>
      <div style={{ background: "#fff", borderRadius: "12px", padding: "48px 40px", textAlign: "center", maxWidth: "480px", width: "90%", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>

        {status === "verifying" && (
          <>
            <h2>Verifying your payment...</h2>
            <p>Please do not close this window.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div style={{ fontSize: "48px", color: "#2f6f5f" }}>✓</div>
            <h2>Appointment Booked Successfully!</h2>
            <p>Confirmation email and invoice have been sent to your email.</p>
            <p style={{ color: "#888", fontSize: "14px" }}>Redirecting to home...</p>
          </>
        )}

        {status === "failed" && (
          <>
            <div style={{ fontSize: "48px", color: "#e53e3e" }}>✕</div>
            <h2>Payment Verification Failed</h2>
            <p>If your payment was deducted, please contact us with your order details.</p>
            <button
              style={{ marginTop: "20px", padding: "10px 24px", background: "#2f6f5f", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Go to Home
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default PaymentStatus;