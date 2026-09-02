import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaGraduationCap, FaHome, FaBook, FaCompass, FaVideo, FaClipboardCheck,
  FaCertificate, FaChartBar, FaTrophy, FaCalendar, FaEnvelope, FaCog,
  FaSignOutAlt, FaChalkboardTeacher, FaUsers, FaFlag, FaTimes,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ user, open, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const traineeLinks = [
    { to: "/dashboard", icon: <FaHome />, label: "Dashboard" },
    { to: "/dashboard", icon: <FaBook />, label: "My Learning" },
    { to: "/courses", icon: <FaCompass />, label: "Explore Courses" },
    { to: "/live-sessions", icon: <FaVideo />, label: "Live Sessions" },
    { to: "/assessments", icon: <FaClipboardCheck />, label: "Assessments" },
    { to: "/certificates", icon: <FaCertificate />, label: "Certificates" },
    { to: "/skills", icon: <FaChartBar />, label: "Skills" },
    { to: "/achievements", icon: <FaTrophy />, label: "Achievements" },
    { to: "/calendar", icon: <FaCalendar />, label: "Calendar" },
    { to: "/messages", icon: <FaEnvelope />, label: "Messages" },
    { to: "/settings", icon: <FaCog />, label: "Settings" },
  ];

  const trainerLinks = [
    { to: "/trainer", icon: <FaHome />, label: "Dashboard" },
    { to: "/trainer/courses", icon: <FaBook />, label: "My Courses" },
    { to: "/trainer/learners", icon: <FaUsers />, label: "Learners" },
    { to: "/live-sessions", icon: <FaVideo />, label: "Live Sessions" },
    { to: "/trainer/analytics", icon: <FaChartBar />, label: "Analytics" },
    { to: "/settings", icon: <FaCog />, label: "Settings" },
  ];

  const adminLinks = [
    { to: "/admin", icon: <FaHome />, label: "Dashboard" },
    { to: "/admin/users", icon: <FaUsers />, label: "Users" },
    { to: "/courses", icon: <FaBook />, label: "Courses" },
    { to: "/admin/trainers", icon: <FaChalkboardTeacher />, label: "Trainers" },
    { to: "/admin/enrollments", icon: <FaGraduationCap />, label: "Enrollments" },
    { to: "/admin/reports", icon: <FaFlag />, label: "Reports" },
    { to: "/settings", icon: <FaCog />, label: "Settings" },
  ];

  const links = user?.role === "admin" ? adminLinks : user?.role === "trainer" ? trainerLinks : traineeLinks;

  return (
    <>
      {open && <div onClick={onClose} className="sidebar-backdrop d-lg-none" aria-hidden="true" />}
      <div className={`sidebar d-flex flex-column${open ? " open" : ""}`}>
        <div className="d-flex align-items-center justify-content-between px-1 mb-4">
          <div className="d-flex align-items-center gap-2">
            <div className="bg-primary text-white p-2 rounded-3"><FaGraduationCap size={18} /></div>
            <span className="fw-bold fs-6">CAPACITY<br /><small className="text-muted fw-normal">CONNECT</small></span>
          </div>
          <button type="button" className="btn btn-sm btn-light d-lg-none" onClick={onClose} aria-label="Close menu"><FaTimes /></button>
        </div>
        <div className="flex-grow-1">
          {links.map((l) => (
            <NavLink key={`${l.to}-${l.label}`} to={l.to} end={l.to === "/dashboard" || l.to === "/trainer" || l.to === "/admin"} onClick={onClose} className={({ isActive }) => `sidebar-item${isActive ? " active" : ""}`}>
              <span className="sidebar-icon">{l.icon}</span><span>{l.label}</span>
            </NavLink>
          ))}
        </div>
        <button type="button" onClick={handleLogout} className="sidebar-item text-danger border-0 bg-transparent text-start w-100">
          <span className="sidebar-icon"><FaSignOutAlt /></span><span>Logout</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
