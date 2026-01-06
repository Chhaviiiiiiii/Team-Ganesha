import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CommandSidebar from "./components/CommandSidebar";
import CommandHeader from "./components/CommandHeader";
import DashboardController from "./components/DashboardController";
import ZoneDetailPanel from "./components/ZoneDetailPanel";
import LoginPage from "./components/LoginPage";
import PoliceLoginPage from "./components/PoliceLoginPage";
import PoliceDashboard from "./components/PoliceDashboard";
import MedicalLoginPage from "./components/MedicalLoginPage";
import MedicalDashboard from "./components/MedicalDashboard";
import StaffLoginPage from "./components/StaffLoginPage";
import StaffDashboard from "./components/StaffDashboard";

function App() {
  const [dashboardMode, setDashboardMode] = useState("regular"); // 'regular', 'police', 'medical', or 'staff'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPoliceAuth, setIsPoliceAuth] = useState(false);
  const [isMedicalAuth, setIsMedicalAuth] = useState(false);
  const [isStaffAuth, setIsStaffAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);

  // Check authentication on mount
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const policeAuth = localStorage.getItem("policeAuth");
    const medicalAuth = localStorage.getItem("medicalAuth");
    const staffAuth = localStorage.getItem("staffAuth");
    const userRole = localStorage.getItem("userRole");
    const userName = localStorage.getItem("userName");
    const userPhone = localStorage.getItem("userPhone");

    if (authStatus === "true") {
      setIsAuthenticated(true);
      setDashboardMode("regular");
      setCurrentUser({
        role: userRole,
        name: userName,
        phone: userPhone,
      });
    } else if (policeAuth === "true") {
      setIsPoliceAuth(true);
      setDashboardMode("police");
    } else if (medicalAuth === "true") {
      setIsMedicalAuth(true);
      setDashboardMode("medical");
    } else if (staffAuth === "true") {
      setIsStaffAuth(true);
      setDashboardMode("staff");
    }
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setDashboardMode("regular");
    setCurrentUser(userData);
  };

  const handlePoliceLogin = () => {
    setIsPoliceAuth(true);
    setDashboardMode("police");
  };

  const handleMedicalLogin = () => {
    setIsMedicalAuth(true);
    setDashboardMode("medical");
  };

  const handleStaffLogin = () => {
    setIsStaffAuth(true);
    setDashboardMode("staff");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhone");
    setIsAuthenticated(false);
    setCurrentUser(null);
    setDashboardMode("regular");
  };

  const handlePoliceLogout = () => {
    localStorage.removeItem("policeAuth");
    setIsPoliceAuth(false);
    setDashboardMode("regular");
  };

  const handleMedicalLogout = () => {
    localStorage.removeItem("medicalAuth");
    setIsMedicalAuth(false);
    setDashboardMode("regular");
  };

  const handleStaffLogout = () => {
    localStorage.removeItem("staffAuth");
    setIsStaffAuth(false);
    setDashboardMode("regular");
  };

  // Show appropriate login page based on URL or mode
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get("mode");
    if (mode === "police") {
      setDashboardMode("police");
    } else if (mode === "medical") {
      setDashboardMode("medical");
    } else if (mode === "staff") {
      setDashboardMode("staff");
    }
  }, []);

  // Staff Dashboard Flow
  if (dashboardMode === "staff") {
    if (!isStaffAuth) {
      return <StaffLoginPage onLogin={handleStaffLogin} />;
    }
    return <StaffDashboard onLogout={handleStaffLogout} />;
  }

  // Medical Dashboard Flow
  if (dashboardMode === "medical") {
    if (!isMedicalAuth) {
      return <MedicalLoginPage onLogin={handleMedicalLogin} />;
    }
    return <MedicalDashboard onLogout={handleMedicalLogout} />;
  }

  // Police Dashboard Flow
  if (dashboardMode === "police") {
    if (!isPoliceAuth) {
      return <PoliceLoginPage onLogin={handlePoliceLogin} />;
    }
    return <PoliceDashboard onLogout={handlePoliceLogout} />;
  }

  // Regular Dashboard Flow
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen w-screen bg-slate-950 overflow-hidden flex">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Left Command Sidebar */}
      <CommandSidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Command Header */}
        <CommandHeader currentUser={currentUser} onLogout={handleLogout} />

        {/* Main Dashboard Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 overflow-auto"
        >
          <DashboardController
            currentView={currentView}
            setCurrentView={setCurrentView}
            setSelectedZone={setSelectedZone}
          />
        </motion.div>
      </div>

      {/* Right Zone Detail Panel */}
      <ZoneDetailPanel
        zone={selectedZone}
        onClose={() => setSelectedZone(null)}
      />
    </div>
  );
}

export default App;
