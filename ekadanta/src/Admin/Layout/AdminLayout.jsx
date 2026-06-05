import React from "react";
import { Link } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">

      <aside className="sidebar">

        <div className="sidebar-logo">
          <h2>Ekadantha</h2>
          <span>Admin Panel</span>
        </div>

        <nav className="sidebar-menu">

          <Link to="/admin/dashboard">
            Dashboard
          </Link>

          <Link to="/admin/appointment">
            Appointments
          </Link>

          <Link to="/admin/patients">
            Patients
          </Link>

          <Link to="/admin/slots">
            Slots
          </Link>

          <Link to="/admin/notes">
            Doctor Notes
          </Link>

          <Link to="/admin/payments">
            Payments
          </Link>

          <Link to="/admin/settings">
            Settings
          </Link>

        </nav>

      </aside>

      <main className="admin-content">
        {children}
      </main>

    </div>
  );
}

export default AdminLayout;