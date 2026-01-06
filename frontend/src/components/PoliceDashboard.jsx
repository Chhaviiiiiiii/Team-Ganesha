import React, { useState, useEffect } from "react";
import {
  Shield,
  AlertTriangle,
  MapPin,
  Clock,
  User,
  Navigation,
  CheckCircle,
  XCircle,
  Bell,
  Search,
  Filter,
  ChevronRight,
  Radio,
  Eye,
  MoreVertical,
  TrendingUp,
  Activity,
  Users,
} from "lucide-react";

const PoliceDashboard = ({ onLogout }) => {
  const [activeCases, setActiveCases] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [stats, setStats] = useState({
    activeCases: 0,
    resolved: 0,
    alerts: 0,
    response: "3.2",
  });

  useEffect(() => {
    // Mock data - Replace with actual API calls
    const mockCases = [
      {
        id: "CASE-001",
        personName: "Rajesh Kumar",
        age: 45,
        lastSeen: "Gate 3, Main Pavilion",
        lastRFID: "2026-01-06 14:23:45",
        timeGap: "1h 37m",
        status: "active",
        priority: "high",
        description: "Male, 5'8\", wearing blue shirt",
        suggestedRoute: ["Gate 3", "Food Court", "Parking Area B"],
        officerAssigned: "Off. Sharma",
      },
      {
        id: "CASE-002",
        personName: "Priya Singh",
        age: 8,
        lastSeen: "Children Play Area",
        lastRFID: "2026-01-06 15:10:22",
        timeGap: "50m",
        status: "active",
        priority: "critical",
        description: "Child, 4'2\", pink dress",
        suggestedRoute: ["Play Area", "Restrooms", "Main Gate"],
        officerAssigned: "Off. Verma",
      },
      {
        id: "CASE-003",
        personName: "Amit Patel",
        age: 62,
        lastSeen: "Temple Area",
        lastRFID: "2026-01-06 13:45:10",
        timeGap: "3h 15m",
        status: "active",
        priority: "high",
        description: "Elderly, 5'6\", white kurta",
        suggestedRoute: ["Temple", "Medical Center", "Exit Gate 1"],
        officerAssigned: "Off. Joshi",
      },
    ];

    const mockAlerts = [
      {
        id: "ALT-001",
        type: "security",
        severity: "high",
        message: "Unauthorized access detected - North Gate",
        location: "North Gate",
        time: "2 min ago",
        status: "unresolved",
      },
      {
        id: "ALT-002",
        type: "crowd",
        severity: "medium",
        message: "High crowd density - Main Pavilion",
        location: "Main Pavilion",
        time: "5 min ago",
        status: "monitoring",
      },
      {
        id: "ALT-003",
        type: "medical",
        severity: "critical",
        message: "Medical emergency reported",
        location: "Food Court Area",
        time: "1 min ago",
        status: "unresolved",
      },
    ];

    setActiveCases(mockCases);
    setAlerts(mockAlerts);
    setStats({
      activeCases: mockCases.length,
      resolved: 12,
      alerts: mockAlerts.filter((a) => a.status === "unresolved").length,
      response: "3.2",
    });
  }, []);

  const handleAcknowledge = (caseId) => {
    setActiveCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, acknowledged: true } : c))
    );
  };

  const handleUpdateStatus = (caseId, newStatus) => {
    setActiveCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, status: newStatus } : c))
    );
  };

  const handleCloseCase = (caseId) => {
    if (confirm("Are you sure you want to close this case?")) {
      setActiveCases((prev) => prev.filter((c) => c.id !== caseId));
      setSelectedCase(null);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      critical: "from-red-500 to-rose-600",
      high: "from-orange-500 to-amber-600",
      medium: "from-yellow-500 to-orange-500",
      low: "from-blue-500 to-cyan-600",
    };
    return colors[priority] || colors.medium;
  };

  const getSeverityColor = (severity) => {
    const colors = {
      critical: "text-red-400 bg-red-500/20 border-red-500/30",
      high: "text-orange-400 bg-orange-500/20 border-orange-500/30",
      medium: "text-yellow-400 bg-yellow-500/20 border-yellow-500/30",
      low: "text-blue-400 bg-blue-500/20 border-blue-500/30",
    };
    return colors[severity] || colors.medium;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 backdrop-blur-xl bg-white/5">
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    Police Command Center
                  </h1>
                  <p className="text-sm text-blue-300">
                    Real-time Operations Dashboard
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">System Active</span>
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
          <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-xl bg-blue-500/30 flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {stats.activeCases}
            </div>
            <div className="text-sm text-blue-300">Active Cases</div>
          </div>

          <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-xl bg-green-500/30 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {stats.resolved}
            </div>
            <div className="text-sm text-green-300">Resolved Today</div>
          </div>

          <div className="backdrop-blur-xl bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-xl bg-red-500/30 flex items-center justify-center">
                <Bell className="w-6 h-6 text-red-400" />
              </div>
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {stats.alerts}
            </div>
            <div className="text-sm text-red-300">Active Alerts</div>
          </div>

          <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-xl bg-purple-500/30 flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {stats.response}m
            </div>
            <div className="text-sm text-purple-300">Avg Response Time</div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Cases */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Cases Panel */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Users className="w-6 h-6 text-blue-400" />
                    Active Lost Person Cases
                  </h2>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                      <Filter className="w-4 h-4 text-blue-400" />
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <input
                    type="text"
                    placeholder="Search cases..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
                {activeCases.map((caseItem) => (
                  <div
                    key={caseItem.id}
                    onClick={() => setSelectedCase(caseItem)}
                    className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-5 hover:bg-white/10 cursor-pointer transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getPriorityColor(
                            caseItem.priority
                          )} flex items-center justify-center shadow-lg`}
                        >
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {caseItem.personName}
                          </h3>
                          <p className="text-sm text-blue-300">
                            {caseItem.age} years • {caseItem.id}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getSeverityColor(
                            caseItem.priority
                          )}`}
                        >
                          {caseItem.priority}
                        </span>
                        <ChevronRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-blue-400">
                          <MapPin className="w-4 h-4" />
                          <span>Last Seen</span>
                        </div>
                        <p className="text-white font-medium">
                          {caseItem.lastSeen}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-orange-400">
                          <Clock className="w-4 h-4" />
                          <span>Time Gap</span>
                        </div>
                        <p className="text-white font-medium">
                          {caseItem.timeGap}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-sm text-blue-300">
                        <Radio className="w-4 h-4" />
                        <span>{caseItem.officerAssigned}</span>
                      </div>
                      <div className="text-xs text-blue-400">
                        RFID: {caseItem.lastRFID}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Security Alerts */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                  Security Alerts
                </h2>
              </div>
              <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-xl border ${getSeverityColor(
                      alert.severity
                    )}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase">
                          {alert.severity}
                        </span>
                      </div>
                      <span className="text-xs">{alert.time}</span>
                    </div>
                    <p className="text-sm font-medium mb-2">{alert.message}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <MapPin className="w-3 h-3" />
                      <span>{alert.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-green-400" />
                  Incidents Map
                </h2>
              </div>
              <div className="p-6">
                <div className="aspect-square rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <p className="text-blue-300 text-sm">Interactive Map</p>
                    <p className="text-blue-400/50 text-xs mt-1">
                      3 active incidents
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="max-w-2xl w-full backdrop-blur-xl bg-slate-900/95 rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Case Details</h2>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-all"
                >
                  <XCircle className="w-6 h-6 text-red-400" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Person Info */}
              <div className="flex items-start gap-4">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getPriorityColor(
                    selectedCase.priority
                  )} flex items-center justify-center shadow-lg`}
                >
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {selectedCase.personName}
                  </h3>
                  <p className="text-blue-300">
                    {selectedCase.age} years • {selectedCase.id}
                  </p>
                  <p className="text-sm text-blue-400 mt-2">
                    {selectedCase.description}
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-sm text-blue-400 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>Last Seen Location</span>
                  </div>
                  <p className="text-white font-medium">
                    {selectedCase.lastSeen}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-sm text-orange-400 mb-2">
                    <Clock className="w-4 h-4" />
                    <span>Time Gap</span>
                  </div>
                  <p className="text-white font-medium">
                    {selectedCase.timeGap}
                  </p>
                </div>
              </div>

              {/* Last RFID Scan */}
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                <div className="flex items-center gap-2 text-sm text-blue-400 mb-2">
                  <Activity className="w-4 h-4" />
                  <span>Last RFID Scan</span>
                </div>
                <p className="text-white font-mono">{selectedCase.lastRFID}</p>
              </div>

              {/* Suggested Patrol Route */}
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                <div className="flex items-center gap-2 text-sm text-green-400 mb-3">
                  <Navigation className="w-4 h-4" />
                  <span>Suggested Patrol Route</span>
                </div>
                <div className="flex items-center gap-2">
                  {selectedCase.suggestedRoute.map((location, idx) => (
                    <React.Fragment key={idx}>
                      <div className="px-3 py-2 rounded-lg bg-green-500/20 border border-green-500/30 text-white text-sm font-medium">
                        {location}
                      </div>
                      {idx < selectedCase.suggestedRoute.length - 1 && (
                        <ChevronRight className="w-4 h-4 text-green-400" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Officer Assigned */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-sm text-blue-400 mb-2">
                  <Radio className="w-4 h-4" />
                  <span>Officer Assigned</span>
                </div>
                <p className="text-white font-medium">
                  {selectedCase.officerAssigned}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleAcknowledge(selectedCase.id)}
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 font-semibold transition-all"
                >
                  <Eye className="w-5 h-5 inline mr-2" />
                  Acknowledge
                </button>
                <button
                  onClick={() =>
                    handleUpdateStatus(selectedCase.id, "investigating")
                  }
                  className="flex-1 py-3 px-4 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 font-semibold transition-all"
                >
                  <Activity className="w-5 h-5 inline mr-2" />
                  Update Status
                </button>
                <button
                  onClick={() => handleCloseCase(selectedCase.id)}
                  className="flex-1 py-3 px-4 rounded-xl bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 font-semibold transition-all"
                >
                  <CheckCircle className="w-5 h-5 inline mr-2" />
                  Close Case
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoliceDashboard;
