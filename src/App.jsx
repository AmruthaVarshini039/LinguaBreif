import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Services from "./Services";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Signup from "./Signup";

export default function App() {
  return (
    <Routes>
      {/* Default route → Services page */}
      <Route path="/" element={<Navigate to="/services" />} />

      {/* Pages */}
      <Route path="/services" element={<Services />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/services" />} />
    </Routes>
  );
}
