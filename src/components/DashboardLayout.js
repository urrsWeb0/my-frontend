import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FiMoon, FiSun } from "react-icons/fi";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function DashboardLayout() {
  const { user, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div>
      <Sidebar user={user} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="dashboard-topbar d-flex align-items-center gap-3 border-bottom p-3">
        <button type="button" className="btn btn-light d-lg-none" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
          <FaBars />
        </button>
        <span className="fw-bold d-lg-none">Capacity Connect</span>
        <div className="ms-auto">
          <button
            type="button"
            className="btn btn-outline-secondary theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <FiSun size={17} /> : <FiMoon size={17} />}
            <span className="d-none d-sm-inline ms-2">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        </div>
      </div>

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}
