import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, TrendingUp, Users, Calendar, DollarSign, Clock, Download, Filter, FileText, Eye,
  Edit, Search, X, Save, Printer, Share2, Mail, Phone, CheckCircle, AlertCircle, Star,
  Activity, Heart, Thermometer, Stethoscope, User, ChevronRight, ChevronDown, Upload,
  FileSpreadsheet, FileImage, FilePdf, RefreshCw, Settings, Bell, DownloadCloud
} from 'lucide-react';

export default function EnhancedDoctorReports() {
  const [dateRange, setDateRange] = useState('this-month');
  const [reportType, setReportType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingReport, setEditingReport] = useState(null);

  const patientReports = [
    {
      id: 'RPT-001',
      patient: 'Ahmed Khan',
      age: 34,
      date: '2024-01-15',
      type: 'Lab Report',
      consultationType: 'Video',
      doctor: 'Dr. Ahmed Hassan',
      status: 'Completed',
      priority: 'Normal',
      tests: [
        { name: 'CBC', result: 'Normal', range: '4.5-11.0 x10^9/L', value: '7.2 x10^9/L' },
        { name: 'Blood Sugar', result: 'High', range: '70-100 mg/dL', value: '145 mg/dL' },
        { name: 'Blood Pressure', result: 'High', range: '120/80 mmHg', value: '140/90 mmHg' }
      ],
      diagnosis: 'Hypertension',
      recommendations: 'Start antihypertensive medication, regular monitoring',
      attachments: ['lab_results.pdf', 'ecg_report.pdf'],
      shareStatus: 'Not Shared',
      lastModified: '2024-01-15 10:30 AM'
    },
    {
      id: 'RPT-002',
      patient: 'Sara Ali',
      age: 28,
      date: '2024-01-14',
      type: 'Radiology',
      consultationType: 'Chamber',
      doctor: 'Dr. Ahmed Hassan',
      status: 'Review Required',
      priority: 'Urgent',
      tests: [
        { name: 'Chest X-Ray', result: 'Normal', range: 'N/A', value: 'No abnormalities detected' },
        { name: 'Heart Rate', result: 'Normal', range: '60-100 bpm', value: '78 bpm' }
      ],
      diagnosis: 'Common Cold',
      recommendations: 'Symptomatic treatment, rest and hydration',
      attachments: ['chest_xray.jpg', 'prescription.pdf'],
      shareStatus: 'Shared with Patient',
      lastModified: '2024-01-14 2:15 PM'
    },
    {
      id: 'RPT-003',
      patient: 'Rahman Hossain',
      age: 45,
      date: '2024-01-13',
      type: 'Pathology',
      consultationType: 'Video',
      doctor: 'Dr. Ahmed Hassan',
      status: 'Pending',
      priority: 'Normal',
      tests: [
        { name: 'HbA1c', result: 'High', range: '4-5.6%', value: '7.8%' },
        { name: 'Fasting Glucose', result: 'High', range: '70-100 mg/dL', value: '156 mg/dL' }
      ],
      diagnosis: 'Diabetes Type 2',
      recommendations: 'Start metformin, dietary modifications',
      attachments: ['blood_work.pdf'],
      shareStatus: 'Not Shared',
      lastModified: '2024-01-13 11:00 AM'
    }
  ];

  const stats = [
    { label: 'Total Reports', value: '234', change: '+12%', icon: FileText, color: 'from-blue-500 to-blue-600' },
    { label: 'Completed', value: '189', change: '+8%', icon: CheckCircle, color: 'from-green-500 to-green-600' },
    { label: 'Pending Review', value: '28', change: '-3%', icon: Clock, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Urgent Cases', value: '17', change: '+2', icon: AlertCircle, color: 'from-red-500 to-red-600' },
  ];

  const filteredReports = patientReports.filter(report =>
    report.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent': return 'text-red-600 bg-red-50 border-red-200';
      case 'High': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Normal': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'Review Required': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Pending': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const ReportCard = ({ report }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-semibold text-gray-900">{report.patient}</h3>
                <span className="text-sm text-gray-500">Age: {report.age}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(report.priority)}`}>
                  {report.priority}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  {report.id}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {report.date}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {report.consultationType}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedReport(report)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Eye className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => {
                setEditingReport(report);
                setShowEditModal(true);
              }}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Edit className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Download className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid md:grid-cols-3 gap-4 mb-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Report Type</p>
              <p className="text-sm font-medium text-gray-900">{report.type}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Diagnosis</p>
              <p className="text-sm font-medium text-gray-900">{report.diagnosis}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                {report.status}
              </span>
            </div>
          </div>
          
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2">Test Results ({report.tests.length})</p>
            <div className="space-y-2">
              {report.tests.slice(0, 2).map((test, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white rounded-lg px-3 py-2">
                  <span className="text-sm font-medium text-gray-900">{test.name}</span>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      test.result === 'Normal' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {test.result}
                    </span>
                    <span className="text-xs text-gray-500">{test.value}</span>
                  </div>
                </div>
              ))}
              {report.tests.length > 2 && (
                <p className="text-xs text-gray-500 text-center">+{report.tests.length - 2} more tests</p>
              )}
            </div>
          </div>
          
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Recommendations</p>
            <p className="text-sm text-gray-700 line-clamp-2">{report.recommendations}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Attachments:</span>
              <div className="flex items-center gap-1">
                {report.attachments.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-1 text-xs text-blue-600">
                    {file.endsWith('.pdf') ? <FilePdf className="w-3 h-3" /> : file.endsWith('.jpg') ? <FileImage className="w-3 h-3" /> : <FileSpreadsheet className="w-3 h-3" />}
                    <span>{file}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                report.shareStatus === 'Shared with Patient' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {report.shareStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enhanced Patient Reports</h1>
          <p className="text-gray-500 mt-1">Comprehensive medical reports management system</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-[#5DBB63]"
          >
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="this-year">This Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f] transition-colors">
            <DownloadCloud className="w-4 h-4" />
            Export All
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by patient name, report ID, diagnosis, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-[#5DBB63]"
              />
            </div>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-[#5DBB63]"
            >
              <option value="all">All Reports</option>
              <option value="lab">Lab Reports</option>
              <option value="radiology">Radiology</option>
              <option value="pathology">Pathology</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {filteredReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>

      {/* Report Detail Modal */}
      <AnimatePresence>
        {selectedReport && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Patient Report Details</h2>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Report ID</p>
                        <p className="font-medium">{selectedReport.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{selectedReport.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Patient</p>
                        <p className="font-medium">{selectedReport.patient}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Age</p>
                        <p className="font-medium">{selectedReport.age} years</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Diagnosis</p>
                      <p className="font-medium text-gray-900">{selectedReport.diagnosis}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-3">Test Results</p>
                      <div className="space-y-3">
                        {selectedReport.tests.map((test, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium text-gray-900">{test.name}</p>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                test.result === 'Normal' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                              }`}>
                                {test.result}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-gray-500">Value:</span>
                                <span className="ml-2 font-medium">{test.value}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Range:</span>
                                <span className="ml-2 font-medium">{test.range}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Recommendations</p>
                      <p className="text-gray-700">{selectedReport.recommendations}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-blue-600 font-medium mb-2">Report Information</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium">{selectedReport.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Consultation:</span>
                          <span className="font-medium">{selectedReport.consultationType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedReport.status)}`}>
                            {selectedReport.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Priority:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(selectedReport.priority)}`}>
                            {selectedReport.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-green-600 font-medium mb-2">Attachments</p>
                      <div className="space-y-2">
                        {selectedReport.attachments.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              {file.endsWith('.pdf') ? <FilePdf className="w-4 h-4 text-red-500" /> : file.endsWith('.jpg') ? <FileImage className="w-4 h-4 text-blue-500" /> : <FileSpreadsheet className="w-4 h-4 text-green-500" />}
                              <span className="text-gray-700">{file}</span>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700">
                              <Download className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Download className="w-4 h-4" />
                        Download Report
                      </button>
                      <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        <Share2 className="w-4 h-4" />
                        Share with Patient
                      </button>
                      <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                        <Printer className="w-4 h-4" />
                        Print Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Report Modal */}
      <AnimatePresence>
        {showEditModal && editingReport && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Edit Report</h2>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                    <input
                      type="text"
                      value={editingReport.patient}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Lab Report</option>
                      <option>Radiology</option>
                      <option>Pathology</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
                  <textarea
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    defaultValue={editingReport.diagnosis}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recommendations</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    defaultValue={editingReport.recommendations}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Completed</option>
                    <option>Review Required</option>
                    <option>Pending</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Normal</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
