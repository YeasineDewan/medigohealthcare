import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileSpreadsheet,
  Download,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  FileText,
  BarChart3,
  PieChart,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Printer,
  Mail,
  Share2
} from 'lucide-react';

const ReportsHub = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [reports, setReports] = useState([]);

  const reportCategories = [
    { id: 'all', name: 'All Reports', icon: FileSpreadsheet },
    { id: 'financial', name: 'Financial', icon: DollarSign },
    { id: 'patient', name: 'Patient', icon: Users },
    { id: 'medical', name: 'Medical', icon: Activity },
    { id: 'operational', name: 'Operational', icon: BarChart3 },
    { id: 'compliance', name: 'Compliance', icon: CheckCircle }
  ];

  const mockReports = [
    {
      id: 1,
      name: 'Monthly Revenue Report',
      category: 'financial',
      type: 'Financial',
      description: 'Comprehensive analysis of monthly revenue streams and trends',
      generatedDate: '2024-01-15',
      lastModified: '2024-01-15',
      format: 'PDF',
      size: '2.4 MB',
      status: 'completed',
      frequency: 'Monthly',
      scheduled: true,
      downloads: 45
    },
    {
      id: 2,
      name: 'Patient Demographics Analysis',
      category: 'patient',
      type: 'Patient',
      description: 'Detailed breakdown of patient demographics and patterns',
      generatedDate: '2024-01-14',
      lastModified: '2024-01-14',
      format: 'Excel',
      size: '1.8 MB',
      status: 'completed',
      frequency: 'Quarterly',
      scheduled: true,
      downloads: 32
    },
    {
      id: 3,
      name: 'Department Performance Metrics',
      category: 'operational',
      type: 'Operational',
      description: 'Performance analysis across all departments',
      generatedDate: '2024-01-13',
      lastModified: '2024-01-13',
      format: 'PDF',
      size: '3.1 MB',
      status: 'completed',
      frequency: 'Weekly',
      scheduled: false,
      downloads: 28
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setReports(mockReports);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5DBB63]"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports Hub</h1>
          <p className="text-gray-600 mt-1">Generate, manage, and distribute comprehensive reports</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGenerateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
          >
            <Plus className="w-4 h-4" />
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: FileSpreadsheet, label: 'Total Reports', value: reports.length, color: 'from-blue-500 to-blue-600' },
          { icon: Download, label: 'Total Downloads', value: reports.reduce((acc, r) => acc + r.downloads, 0), color: 'from-green-500 to-green-600' },
          { icon: Calendar, label: 'Scheduled', value: reports.filter(r => r.scheduled).length, color: 'from-purple-500 to-purple-600' },
          { icon: Clock, label: 'This Month', value: reports.filter(r => new Date(r.generatedDate).getMonth() === new Date().getMonth()).length, color: 'from-orange-500 to-orange-600' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
          />
        </div>
        <div className="flex gap-2">
          {reportCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                selectedCategory === category.id
                  ? 'bg-[#5DBB63] text-white border-[#5DBB63]'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 shadow-sm"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 font-medium text-gray-700">Report Name</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Category</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Generated</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Format</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Downloads</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report, index) => (
                <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">{report.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {report.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-sm text-gray-900">{report.generatedDate}</p>
                      <p className="text-xs text-gray-600">{report.frequency}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {report.format === 'PDF' ? (
                        <FileText className="w-4 h-4 text-red-600" />
                      ) : (
                        <FileSpreadsheet className="w-4 h-4 text-green-600" />
                      )}
                      <span className="text-sm text-gray-900">{report.format}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">{report.downloads}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Share2 className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportsHub;
