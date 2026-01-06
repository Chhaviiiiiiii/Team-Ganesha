import React, { useState, useEffect } from "react";
import {
  Heart,
  Activity,
  Ambulance,
  MapPin,
  Clock,
  User,
  Phone,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  TrendingUp,
  Navigation,
  Stethoscope,
  Zap,
  ChevronRight,
  Users,
  Timer,
  Plus,
  MoreVertical,
  Eye,
  Radio,
  Bell,
  X,
  RefreshCw,
} from "lucide-react";

const MedicalDashboard = ({ onLogout }) => {
  const [emergencies, setEmergencies] = useState([]);
  const [ambulances, setAmbulances] = useState([]);
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showNewEmergencyForm, setShowNewEmergencyForm] = useState(false);
  const [showAmbulanceList, setShowAmbulanceList] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [treatedCount, setTreatedCount] = useState(18);
  const [stats, setStats] = useState({
    activeEmergencies: 0,
    treated: 0,
    ambulancesActive: 0,
    avgResponse: "4.5",
  });

  useEffect(() => {
    // Initialize ambulances
    const ambulanceList = [
      {
        id: "AMB-01",
        status: "available",
        location: "Base Station",
        assignedTo: null,
      },
      {
        id: "AMB-02",
        status: "available",
        location: "Base Station",
        assignedTo: null,
      },
      {
        id: "AMB-03",
        status: "available",
        location: "Base Station",
        assignedTo: null,
      },
      {
        id: "AMB-04",
        status: "available",
        location: "Base Station",
        assignedTo: null,
      },
      {
        id: "AMB-05",
        status: "available",
        location: "Base Station",
        assignedTo: null,
      },
    ];
    setAmbulances(ambulanceList);

    // Mock emergency data
    const mockEmergencies = [
      {
        id: "EMG-001",
        patientName: "Ramesh Kumar",
        age: 58,
        rfidId: "RFID-45892",
        issue: "Cardiac Arrest",
        category: "critical",
        priority: "critical",
        location: "Gate 5, Main Area",
        coordinates: { lat: 25.4358, lng: 81.8463 },
        reportedTime: new Date().toISOString(),
        vitals: {
          heartRate: 145,
          bp: "180/110",
          spo2: 88,
        },
        status: "pending",
        ambulanceAssigned: null,
        phone: "+91 9876543210",
      },
      {
        id: "EMG-002",
        patientName: "Sita Devi",
        age: 72,
        rfidId: "RFID-78234",
        issue: "Heat Stroke",
        category: "high",
        priority: "high",
        location: "Temple Area, Zone 3",
        coordinates: { lat: 25.432, lng: 81.848 },
        reportedTime: new Date(Date.now() - 5 * 60000).toISOString(),
        vitals: {
          heartRate: 128,
          bp: "150/95",
          spo2: 92,
        },
        status: "pending",
        ambulanceAssigned: null,
        phone: "+91 9876543211",
      },
      {
        id: "EMG-003",
        patientName: "Amit Singh",
        age: 35,
        rfidId: "RFID-12456",
        issue: "Fracture - Left Arm",
        category: "medium",
        priority: "medium",
        location: "Food Court Area",
        coordinates: { lat: 25.434, lng: 81.8445 },
        reportedTime: new Date(Date.now() - 15 * 60000).toISOString(),
        vitals: {
          heartRate: 95,
          bp: "130/85",
          spo2: 98,
        },
        status: "ambulance-assigned",
        ambulanceAssigned: "AMB-03",
        phone: "+91 9876543212",
      },
      {
        id: "EMG-004",
        patientName: "Priya Sharma",
        age: 28,
        rfidId: "RFID-89012",
        issue: "Severe Dehydration",
        category: "high",
        priority: "high",
        location: "Parking Area B",
        coordinates: { lat: 25.4365, lng: 81.8425 },
        reportedTime: new Date(Date.now() - 6 * 60000).toISOString(),
        vitals: {
          heartRate: 112,
          bp: "110/70",
          spo2: 94,
        },
        status: "pending",
        ambulanceAssigned: null,
        phone: "+91 9876543213",
      },
      {
        id: "EMG-005",
        patientName: "Rajesh Patel",
        age: 45,
        rfidId: "RFID-34567",
        issue: "Breathing Difficulty",
        category: "critical",
        priority: "critical",
        location: "Medical Tent 2",
        coordinates: { lat: 25.4355, lng: 81.847 },
        reportedTime: new Date(Date.now() - 5 * 60000).toISOString(),
        vitals: {
          heartRate: 132,
          bp: "160/100",
          spo2: 85,
        },
        status: "ambulance-assigned",
        ambulanceAssigned: "AMB-01",
        phone: "+91 9876543214",
      },
    ];

    const sortedEmergencies = mockEmergencies.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    setEmergencies(sortedEmergencies);
    updateStats(sortedEmergencies, treatedCount);

    // Update ambulances with assignments
    const updatedAmbulances = ambulanceList.map((amb) => {
      const assigned = sortedEmergencies.find(
        (e) => e.ambulanceAssigned === amb.id
      );
      return assigned
        ? {
            ...amb,
            status: "dispatched",
            assignedTo: assigned.id,
            location: assigned.location,
          }
        : amb;
    });
    setAmbulances(updatedAmbulances);

    // Simulate time updates every minute
    const timer = setInterval(() => {
      setEmergencies((prev) =>
        prev.map((e) => ({
          ...e,
          reportedTime: e.reportedTime, // Keep original time
        }))
      );
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Update stats whenever emergencies change
  useEffect(() => {
    updateStats(emergencies, treatedCount);
  }, [emergencies, treatedCount]);

  const updateStats = (currentEmergencies, treated) => {
    setStats({
      activeEmergencies: currentEmergencies.filter(
        (e) => e.status !== "treated"
      ).length,
      treated: treated,
      ambulancesActive: currentEmergencies.filter((e) => e.ambulanceAssigned)
        .length,
      avgResponse: "4.5",
    });
  };

  const getTimeElapsed = (reportedTime) => {
    const now = new Date();
    const reported = new Date(reportedTime);
    const diffMs = now - reported;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m`;
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `${hours}h ${mins}m`;
  };

  const showNotification = (message, type = "info") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  const handleAssignAmbulance = (emergencyId, ambulanceId = null) => {
    const availableAmb =
      ambulanceId || ambulances.find((amb) => amb.status === "available");

    if (!availableAmb) {
      showNotification("No ambulances available at the moment.", "error");
      return;
    }

    const ambId =
      typeof availableAmb === "string" ? availableAmb : availableAmb.id;

    setEmergencies((prev) =>
      prev.map((e) =>
        e.id === emergencyId
          ? { ...e, status: "ambulance-assigned", ambulanceAssigned: ambId }
          : e
      )
    );

    setAmbulances((prev) =>
      prev.map((amb) =>
        amb.id === ambId
          ? { ...amb, status: "dispatched", assignedTo: emergencyId }
          : amb
      )
    );

    if (selectedEmergency?.id === emergencyId) {
      setSelectedEmergency((prev) => ({
        ...prev,
        status: "ambulance-assigned",
        ambulanceAssigned: ambId,
      }));
    }

    const emergency = emergencies.find((e) => e.id === emergencyId);
    showNotification(
      `${ambId} assigned to ${emergency?.patientName}`,
      "success"
    );
  };

  const handleMarkTreated = (emergencyId) => {
    const emergency = emergencies.find((e) => e.id === emergencyId);

    setEmergencies((prev) => prev.filter((e) => e.id !== emergencyId));

    // Free up ambulance if assigned
    if (emergency?.ambulanceAssigned) {
      setAmbulances((prev) =>
        prev.map((amb) =>
          amb.id === emergency.ambulanceAssigned
            ? {
                ...amb,
                status: "available",
                assignedTo: null,
                location: "Base Station",
              }
            : amb
        )
      );
    }

    setTreatedCount((prev) => prev + 1);
    setSelectedEmergency(null);
    showNotification(`${emergency?.patientName} marked as treated`, "success");
  };

  const handleAddEmergency = (newEmergency) => {
    const emergency = {
      id: `EMG-${String(emergencies.length + 1).padStart(3, "0")}`,
      ...newEmergency,
      reportedTime: new Date().toISOString(),
      status: "pending",
      ambulanceAssigned: null,
    };

    setEmergencies((prev) => {
      const updated = [emergency, ...prev];
      return updated.sort((a, b) => {
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    });

    setShowNewEmergencyForm(false);
    showNotification(
      `New emergency added: ${emergency.patientName}`,
      "warning"
    );
  };

  const handleUpdateStatus = (emergencyId, newStatus) => {
    setEmergencies((prev) =>
      prev.map((e) => (e.id === emergencyId ? { ...e, status: newStatus } : e))
    );

    if (selectedEmergency?.id === emergencyId) {
      setSelectedEmergency((prev) => ({ ...prev, status: newStatus }));
    }

    showNotification("Emergency status updated", "info");
  };

  const getPriorityColor = (priority) => {
    const colors = {
      critical: "from-red-600 to-rose-700",
      high: "from-orange-600 to-amber-700",
      medium: "from-yellow-600 to-orange-600",
      low: "from-blue-600 to-cyan-700",
    };
    return colors[priority] || colors.medium;
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      critical: "text-red-400 bg-red-500/20 border-red-500/40",
      high: "text-orange-400 bg-orange-500/20 border-orange-500/40",
      medium: "text-yellow-400 bg-yellow-500/20 border-yellow-500/40",
      low: "text-blue-400 bg-blue-500/20 border-blue-500/40",
    };
    return styles[priority] || styles.medium;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "text-red-400 bg-red-500/20 border-red-500/30",
      "ambulance-assigned":
        "text-yellow-400 bg-yellow-500/20 border-yellow-500/30",
      "en-route": "text-blue-400 bg-blue-500/20 border-blue-500/30",
      treated: "text-green-400 bg-green-500/20 border-green-500/30",
    };
    return colors[status] || colors.pending;
  };

  const getVitalStatus = (vital, type) => {
    if (type === "heartRate") {
      if (vital > 120 || vital < 60) return "text-red-400";
      if (vital > 100 || vital < 70) return "text-yellow-400";
      return "text-green-400";
    }
    if (type === "spo2") {
      if (vital < 90) return "text-red-400";
      if (vital < 95) return "text-yellow-400";
      return "text-green-400";
    }
    return "text-white";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 backdrop-blur-xl bg-white/5">
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center shadow-lg relative">
                  <Heart className="w-6 h-6 text-white fill-white" />
                  <div className="absolute inset-0 rounded-xl bg-red-400 animate-ping opacity-20"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    Medical Emergency Center
                  </h1>
                  <p className="text-sm text-red-300">
                    Real-time Emergency Response
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                <Activity className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="text-sm text-red-400">EMS Active</span>
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative max-w-screen-2xl mx-auto px-6 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="backdrop-blur-xl bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-xl bg-red-500/30 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <Zap className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {stats.activeEmergencies}
            </div>
            <div className="text-sm text-red-300">Active Emergencies</div>
          </div>

          <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-xl bg-green-500/30 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {stats.treated}
            </div>
            <div className="text-sm text-green-300">Treated Today</div>
          </div>

          <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-xl bg-blue-500/30 flex items-center justify-center">
                <Ambulance className="w-6 h-6 text-blue-400" />
              </div>
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {stats.ambulancesActive}
            </div>
            <div className="text-sm text-blue-300">Ambulances Active</div>
          </div>

          <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-xl bg-purple-500/30 flex items-center justify-center">
                <Timer className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {stats.avgResponse}m
            </div>
            <div className="text-sm text-purple-300">Avg Response Time</div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Emergency Queue */}
          <div className="lg:col-span-2 space-y-6">
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                    Priority Emergency Queue
                  </h2>
                  <div className="flex items-center gap-2">
                    <select
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="all">All Priorities</option>
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="all">All Categories</option>
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
                  <input
                    type="text"
                    placeholder="Search by patient name, RFID, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-red-300/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
                {emergencies
                  .filter(
                    (e) =>
                      filterPriority === "all" || e.priority === filterPriority
                  )
                  .filter(
                    (e) =>
                      filterCategory === "all" || e.category === filterCategory
                  )
                  .filter(
                    (e) =>
                      searchQuery === "" ||
                      e.patientName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      e.rfidId
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      e.location
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      e.issue.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((emergency) => (
                    <div
                      key={emergency.id}
                      onClick={() => setSelectedEmergency(emergency)}
                      className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-5 hover:bg-white/10 cursor-pointer transition-all group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getPriorityColor(
                              emergency.priority
                            )} flex items-center justify-center shadow-lg relative`}
                          >
                            <Activity className="w-6 h-6 text-white" />
                            {emergency.priority === "critical" && (
                              <div className="absolute inset-0 rounded-xl bg-red-400 animate-ping opacity-30"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {emergency.patientName}
                            </h3>
                            <p className="text-sm text-red-300">
                              {emergency.age} years • {emergency.rfidId}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase border ${getPriorityBadge(
                              emergency.priority
                            )}`}
                          >
                            {emergency.priority}
                          </span>
                          <ChevronRight className="w-5 h-5 text-red-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Issue & Category */}
                      <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="flex items-center gap-2 text-sm text-red-400 mb-1">
                          <Stethoscope className="w-4 h-4" />
                          <span className="font-semibold">
                            {emergency.issue}
                          </span>
                        </div>
                        <p className="text-xs text-red-300">
                          Category: {emergency.category}
                        </p>
                      </div>

                      {/* Vitals */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                          <div className="text-xs text-gray-400 mb-1">
                            Heart Rate
                          </div>
                          <div
                            className={`text-sm font-bold ${getVitalStatus(
                              emergency.vitals.heartRate,
                              "heartRate"
                            )}`}
                          >
                            {emergency.vitals.heartRate} bpm
                          </div>
                        </div>
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                          <div className="text-xs text-gray-400 mb-1">BP</div>
                          <div className="text-sm font-bold text-white">
                            {emergency.vitals.bp}
                          </div>
                        </div>
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                          <div className="text-xs text-gray-400 mb-1">SpO2</div>
                          <div
                            className={`text-sm font-bold ${getVitalStatus(
                              emergency.vitals.spo2,
                              "spo2"
                            )}`}
                          >
                            {emergency.vitals.spo2}%
                          </div>
                        </div>
                      </div>

                      {/* Location & Time */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-red-400">
                            <MapPin className="w-4 h-4" />
                            <span>Location</span>
                          </div>
                          <p className="text-white font-medium text-sm">
                            {emergency.location}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-orange-400">
                            <Clock className="w-4 h-4" />
                            <span>Time Elapsed</span>
                          </div>
                          <p className="text-white font-medium text-sm">
                            {getTimeElapsed(emergency.reportedTime)}
                          </p>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase border ${getStatusColor(
                            emergency.status
                          )}`}
                        >
                          {emergency.status.replace("-", " ")}
                        </span>
                        {emergency.ambulanceAssigned && (
                          <div className="flex items-center gap-2 text-sm text-blue-400">
                            <Ambulance className="w-4 h-4" />
                            <span>{emergency.ambulanceAssigned}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Map */}
          <div className="space-y-6">
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-green-400" />
                  Location Map
                </h2>
              </div>
              <div className="p-6">
                <div className="aspect-square rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center relative overflow-hidden">
                  {/* Map Placeholder */}
                  <div className="text-center z-10">
                    <MapPin className="w-12 h-12 text-red-400 mx-auto mb-3" />
                    <p className="text-red-300 text-sm font-semibold">
                      Interactive Map
                    </p>
                    <p className="text-red-400/50 text-xs mt-1">
                      {emergencies.length} active locations
                    </p>
                  </div>

                  {/* Animated markers */}
                  <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                  <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-orange-500 rounded-full animate-ping delay-500"></div>
                  <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-yellow-500 rounded-full animate-ping delay-1000"></div>
                </div>

                {/* Legend */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-gray-400">Critical</span>
                    </div>
                    <span className="text-white font-semibold">
                      {
                        emergencies.filter((e) => e.priority === "critical")
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-400">High</span>
                    </div>
                    <span className="text-white font-semibold">
                      {emergencies.filter((e) => e.priority === "high").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-400">Medium</span>
                    </div>
                    <span className="text-white font-semibold">
                      {
                        emergencies.filter((e) => e.priority === "medium")
                          .length
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowNewEmergencyForm(true)}
                  className="w-full py-3 px-4 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  New Emergency
                </button>
                <button
                  onClick={() => setShowAmbulanceList(true)}
                  className="w-full py-3 px-4 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Ambulance className="w-5 h-5" />
                  View All Ambulances (
                  {
                    ambulances.filter((a) => a.status === "available").length
                  }{" "}
                  Available)
                </button>
                <button
                  onClick={() => {
                    const treated = emergencies.filter(
                      (e) => e.status === "treated"
                    );
                    showNotification(
                      `Total treated today: ${treatedCount}`,
                      "info"
                    );
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Activity className="w-5 h-5" />
                  Treatment History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Detail Modal */}
      {selectedEmergency && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="max-w-3xl w-full backdrop-blur-xl bg-slate-900/95 rounded-2xl border border-white/20 overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  Emergency Details
                </h2>
                <button
                  onClick={() => setSelectedEmergency(null)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-all"
                >
                  <XCircle className="w-6 h-6 text-red-400" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Patient Info */}
              <div className="flex items-start gap-4">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getPriorityColor(
                    selectedEmergency.priority
                  )} flex items-center justify-center shadow-lg relative`}
                >
                  <Activity className="w-8 h-8 text-white" />
                  {selectedEmergency.priority === "critical" && (
                    <div className="absolute inset-0 rounded-xl bg-red-400 animate-ping opacity-30"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {selectedEmergency.patientName}
                      </h3>
                      <p className="text-red-300">
                        {selectedEmergency.age} years • {selectedEmergency.id}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold uppercase border ${getPriorityBadge(
                        selectedEmergency.priority
                      )}`}
                    >
                      {selectedEmergency.priority}
                    </span>
                  </div>
                </div>
              </div>

              {/* RFID */}
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                <div className="flex items-center gap-2 text-sm text-blue-400 mb-2">
                  <Radio className="w-4 h-4" />
                  <span>Patient RFID ID</span>
                </div>
                <p className="text-white font-mono text-lg">
                  {selectedEmergency.rfidId}
                </p>
              </div>

              {/* Medical Issue */}
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                <div className="flex items-center gap-2 text-sm text-red-400 mb-2">
                  <Stethoscope className="w-4 h-4" />
                  <span>Medical Issue</span>
                </div>
                <p className="text-white font-semibold text-lg mb-1">
                  {selectedEmergency.issue}
                </p>
                <p className="text-red-300 text-sm">
                  Category:{" "}
                  <span className="font-semibold uppercase">
                    {selectedEmergency.category}
                  </span>
                </p>
              </div>

              {/* Vitals */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm text-gray-400 mb-2">Heart Rate</div>
                  <div
                    className={`text-2xl font-bold ${getVitalStatus(
                      selectedEmergency.vitals.heartRate,
                      "heartRate"
                    )}`}
                  >
                    {selectedEmergency.vitals.heartRate}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">bpm</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm text-gray-400 mb-2">
                    Blood Pressure
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {selectedEmergency.vitals.bp}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">mmHg</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm text-gray-400 mb-2">SpO2</div>
                  <div
                    className={`text-2xl font-bold ${getVitalStatus(
                      selectedEmergency.vitals.spo2,
                      "spo2"
                    )}`}
                  >
                    {selectedEmergency.vitals.spo2}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">%</div>
                </div>
              </div>

              {/* Location */}
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                <div className="flex items-center gap-2 text-sm text-green-400 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Location</span>
                </div>
                <p className="text-white font-medium text-lg mb-2">
                  {selectedEmergency.location}
                </p>
                <p className="text-green-300 text-sm font-mono">
                  Coordinates: {selectedEmergency.coordinates.lat},{" "}
                  {selectedEmergency.coordinates.lng}
                </p>
              </div>

              {/* Time Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <Clock className="w-4 h-4" />
                    <span>Reported Time</span>
                  </div>
                  <p className="text-white font-medium">
                    {new Date(selectedEmergency.reportedTime).toLocaleString()}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
                  <div className="flex items-center gap-2 text-sm text-orange-400 mb-2">
                    <Timer className="w-4 h-4" />
                    <span>Time Elapsed</span>
                  </div>
                  <p className="text-white font-bold text-xl">
                    {getTimeElapsed(selectedEmergency.reportedTime)}
                  </p>
                </div>
              </div>

              {/* Ambulance Status */}
              {selectedEmergency.ambulanceAssigned ? (
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <div className="flex items-center gap-2 text-sm text-blue-400 mb-2">
                    <Ambulance className="w-4 h-4" />
                    <span>Ambulance Assigned</span>
                  </div>
                  <p className="text-white font-bold text-lg">
                    {selectedEmergency.ambulanceAssigned}
                  </p>
                  <p className="text-blue-300 text-sm mt-1">Status: En Route</p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                  <div className="flex items-center gap-2 text-yellow-400">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-semibold">
                      No ambulance assigned yet
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 case-actions">
                {!selectedEmergency.ambulanceAssigned ? (
                  <button
                    onClick={() => handleAssignAmbulance(selectedEmergency.id)}
                    className="flex-1 py-4 px-4 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Ambulance className="w-5 h-5" />
                    Assign Ambulance
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      // Reassign to different ambulance
                      const available = ambulances.find(
                        (a) => a.status === "available"
                      );
                      if (available) {
                        handleAssignAmbulance(
                          selectedEmergency.id,
                          available.id
                        );
                      }
                    }}
                    className="flex-1 py-4 px-4 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Reassign Ambulance
                  </button>
                )}
                <button
                  onClick={() =>
                    handleUpdateStatus(selectedEmergency.id, "en-route")
                  }
                  className="flex-1 py-4 px-4 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Activity className="w-5 h-5" />
                  Mark En Route
                </button>
                <button
                  onClick={() => handleMarkTreated(selectedEmergency.id)}
                  className="flex-1 py-4 px-4 rounded-xl bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Mark Treated
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      <div className="fixed top-20 right-6 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`backdrop-blur-xl rounded-xl border p-4 shadow-lg animate-slide-in-right flex items-center gap-3 ${
              notification.type === "success"
                ? "bg-green-500/20 border-green-500/30 text-green-400"
                : notification.type === "error"
                ? "bg-red-500/20 border-red-500/30 text-red-400"
                : notification.type === "warning"
                ? "bg-orange-500/20 border-orange-500/30 text-orange-400"
                : "bg-blue-500/20 border-blue-500/30 text-blue-400"
            }`}
          >
            {notification.type === "success" && (
              <CheckCircle className="w-5 h-5" />
            )}
            {notification.type === "error" && <XCircle className="w-5 h-5" />}
            {notification.type === "warning" && (
              <AlertTriangle className="w-5 h-5" />
            )}
            {notification.type === "info" && <Bell className="w-5 h-5" />}
            <span className="font-medium">{notification.message}</span>
          </div>
        ))}
      </div>

      {/* New Emergency Form Modal */}
      {showNewEmergencyForm && (
        <NewEmergencyForm
          onClose={() => setShowNewEmergencyForm(false)}
          onSubmit={handleAddEmergency}
        />
      )}

      {/* Ambulance List Modal */}
      {showAmbulanceList && (
        <AmbulanceListModal
          ambulances={ambulances}
          emergencies={emergencies}
          onClose={() => setShowAmbulanceList(false)}
          onAssign={handleAssignAmbulance}
        />
      )}
    </div>
  );
};

// New Emergency Form Component
const NewEmergencyForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    rfidId: "",
    issue: "",
    category: "medium",
    priority: "medium",
    location: "",
    phone: "",
    vitals: {
      heartRate: "",
      bp: "",
      spo2: "",
    },
    coordinates: { lat: 25.4358, lng: 81.8463 },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      age: parseInt(formData.age),
      vitals: {
        heartRate: parseInt(formData.vitals.heartRate),
        bp: formData.vitals.bp,
        spo2: parseInt(formData.vitals.spo2),
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="max-w-2xl w-full backdrop-blur-xl bg-slate-900/95 rounded-2xl border border-white/20 overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Add New Emergency</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-all"
          >
            <X className="w-6 h-6 text-red-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Patient Name*
              </label>
              <input
                type="text"
                required
                value={formData.patientName}
                onChange={(e) =>
                  setFormData({ ...formData, patientName: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Age*
              </label>
              <input
                type="number"
                required
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                RFID ID*
              </label>
              <input
                type="text"
                required
                value={formData.rfidId}
                onChange={(e) =>
                  setFormData({ ...formData, rfidId: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Medical Issue*
            </label>
            <input
              type="text"
              required
              value={formData.issue}
              onChange={(e) =>
                setFormData({ ...formData, issue: e.target.value })
              }
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Priority*
              </label>
              <select
                required
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Category*
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Location*
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Vitals
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <input
                  type="number"
                  placeholder="Heart Rate (bpm)"
                  value={formData.vitals.heartRate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vitals: { ...formData.vitals, heartRate: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="BP (120/80)"
                  value={formData.vitals.bp}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vitals: { ...formData.vitals, bp: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="SpO2 (%)"
                  value={formData.vitals.spo2}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vitals: { ...formData.vitals, spo2: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 font-semibold transition-all"
            >
              Add Emergency
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Ambulance List Modal Component
const AmbulanceListModal = ({ ambulances, emergencies, onClose, onAssign }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="max-w-3xl w-full backdrop-blur-xl bg-slate-900/95 rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Ambulance className="w-6 h-6 text-blue-400" />
            Ambulance Fleet Status
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-all"
          >
            <X className="w-6 h-6 text-blue-400" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {ambulances.map((ambulance) => {
            const assignedEmergency = ambulance.assignedTo
              ? emergencies.find((e) => e.id === ambulance.assignedTo)
              : null;

            return (
              <div
                key={ambulance.id}
                className={`backdrop-blur-xl rounded-xl border p-5 ${
                  ambulance.status === "available"
                    ? "bg-green-500/10 border-green-500/30"
                    : "bg-orange-500/10 border-orange-500/30"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        ambulance.status === "available"
                          ? "bg-green-500/30"
                          : "bg-orange-500/30"
                      }`}
                    >
                      <Ambulance
                        className={`w-6 h-6 ${
                          ambulance.status === "available"
                            ? "text-green-400"
                            : "text-orange-400"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {ambulance.id}
                      </h3>
                      <p
                        className={`text-sm font-semibold uppercase ${
                          ambulance.status === "available"
                            ? "text-green-400"
                            : "text-orange-400"
                        }`}
                      >
                        {ambulance.status}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                      ambulance.status === "available"
                        ? "text-green-400 bg-green-500/20 border-green-500/40"
                        : "text-orange-400 bg-orange-500/20 border-orange-500/40"
                    }`}
                  >
                    {ambulance.status === "available" ? "Ready" : "On Duty"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{ambulance.location}</span>
                  </div>

                  {assignedEmergency && (
                    <div className="text-white">
                      Assigned to:{" "}
                      <span className="font-semibold">
                        {assignedEmergency.patientName}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-6 border-t border-white/10">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">
                {ambulances.length}
              </div>
              <div className="text-sm text-gray-400">Total Fleet</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">
                {ambulances.filter((a) => a.status === "available").length}
              </div>
              <div className="text-sm text-gray-400">Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400">
                {ambulances.filter((a) => a.status === "dispatched").length}
              </div>
              <div className="text-sm text-gray-400">Dispatched</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDashboard;
