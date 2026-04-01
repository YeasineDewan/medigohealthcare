import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  FileText,
  FileSpreadsheet,
  Printer,
  Plus,
  ChevronDown,
  Calendar,
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  TestTube,
  Users,
  BarChart3,
  PieChart,
  Activity,
  FileCheck,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  AlertCircle,
  CheckCircle,
  XCircle,
  CalendarDays,
  FilterIcon
} from 'lucide-react';
import { exportToPDF, exportToWord, exportToCSV, printData } from '../../../utils/exportUtils';

const LabReports = () => {
  const [dateRange, setDateRange] = useState('this-month');
  const [loading, setLoading] = useState(false);

  // Mock data for analytics
  const statsData = {
    totalTests: 4520,
    totalTestsChange: 12.5,
    revenue: 285400,
    revenueChange: 8.2,
    avgTurnaround: 4.2,
    turnaroundChange: -15.3,
    patientSatisfaction: 4.6,
    satisfactionChange: 5.1
  };

  const categoryData = [
    { name: 'Hematology', tests: 1250, revenue: 56250, color: 'bg-blue-500' },
    { name: 'Biochemistry', tests: 1480, revenue: 88800, color: 'bg-green-500' },
    { name: 'Serology', tests: 580, revenue: 29000, color: 'bg-purple-500' },
    { name: 'Immunology', tests: 420, revenue: 42000, color: 'bg-orange-500' },
    { name: 'Molecular', tests: 290, revenue: 43500, color: 'bg-pink-500' },
    { name: 'Pathology', tests: 500, revenue: 25850, color: 'bg-yellow-500' }
  ];

  const topTests = [
    { name: 'Complete Blood Count (CBC)', tests: 890, revenue: 40050, trend: 'up' },
    { name: 'Lipid Profile', tests: 650, revenue: 42250, trend: 'up' },
    { name: 'Liver Function Test', tests: 520, revenue: 39000, trend: 'up' },
    { name: 'Thyroid Profile', tests: 480, revenue: 57600, trend: 'stable' },
    { name: 'Kidney Function Test', tests: 420, revenue: 29400, trend: 'down' },
    { name: 'HbA1c', tests: 380, revenue: 20900, trend: 'up' },
    { name: 'COVID-19 RT-PCR', tests: 280, revenue: 42000, trend: 'down' },
    { name: 'Urine Analysis', tests: 250, revenue: 6250, trend: 'stable' }
  ];

  const turnaroundData = [
    { category: 'Hematology', avg: 2.5, target: 4, status: 'excellent' },
    { category: 'Biochemistry', avg: 4.8, target: 6, status: 'good' },
    { category: 'Serology', avg: 6.2, target: 12, status: 'excellent' },
    { category: 'Immunology', avg: 12.5, target: 24, status: 'good' },
    { category: 'Molecular', avg: 28, target: 48, status: 'good' },
    { category: 'Pathology', avg: 8, target: 24, status: 'excellent' }
  ];

  const monthlyTrend = [
    { month: 'Aug', tests: 3200, revenue: 192000 },
    { month: 'Sep', tests: 3450, revenue: 207000 },
    { month: 'Oct', tests: 3680, revenue: 220800 },
    { month: 'Nov', tests: 3890, revenue: 233400 },
    { month: 'Dec', tests: 4120, revenue: 247200 },
    { month: 'Jan', tests: 4520, revenue: 285400 }
  ];

  const handleExport = (format) => {
    switch (format) {
      case 'pdf':
        exportToPDF([], 'Lab Reports Summary', []);
        break;
      case 'csv':
        exportToCSV([], 'lab-reports');
        break;
      case 'print':
        printData([], 'Lab Reports Summary');
        break;
      default:
        break;
    }
  };

  const maxRevenue = Math.max(...categoryData.map(c => c.revenue));
  const totalRevenue = categoryData.reduce((sum, c) => sum + c.revenue, 0);
  const maxTests = Math.max(...monthlyTrend.map(m => m.tests));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lab Reports</h1>
          <p className="text-gray-500 mt-1">Laboratory performance analytics and insights</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
            <option value="this-quarter">This Quarter</option>
            <option value="this-year">This Year</option>
          </select>
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <button onClick={() => handleExport('pdf')} className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50">
                <FileText className="w-4 h-4" /> Export as PDF
              </button>
              <button onClick={() => handleExport('csv')} className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50">
                <FileSpreadsheet className="w-4 h-4" /> Export as CSV
              </button>
              <button onClick={() => handleExport('print')} className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50">
                <Printer className="w-4 h-4" /> Print
              </button>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]">
            <Plus className="w-4 h-4" />
            Custom Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TestTube className="w-6 h-6 text-blue-600" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${statsData.totalTestsChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {statsData.totalTestsChange >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(statsData.totalTestsChange)}%
            </div>
          </div>
          <p className="text-sm text-gray-600">Total Tests</p>
          <p className="text-2xl font-bold text-gray-900">{statsData.totalTests.toLocaleString()}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${statsData.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {statsData.revenueChange >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(statsData.revenueChange)}%
            </div>
          </div>
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900">${statsData.revenue.toLocaleString()}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-green-600">
              <ArrowDownRight className="w-4 h-4" />
              {Math.abs(statsData.turnaroundChange)}%
            </div>
          </div>
          <p className="text-sm text-gray-600">Avg. Turnaround (hrs)</p>
          <p className="text-2xl font-bold text-gray-900">{statsData.avgTurnaround}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${statsData.satisfactionChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {statsData.satisfactionChange >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(statsData.satisfactionChange)}%
            </div>
          </div>
          <p className="text-sm text-gray-600">Patient Satisfaction</p>
          <p className="text-2xl font-bold text-gray-900">{statsData.patientSatisfaction}/5.0</p>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Test Volume</h3>
          <div className="flex items-end justify-between h-64 gap-2">
            {monthlyTrend.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.tests / maxTests) * 100}%` }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-[#5DBB63] to-[#4CAF50] rounded-t-lg"
                />
                <span className="text-xs text-gray-500 mt-2">{item.month}</span>
                <span className="text-xs font-medium text-gray-700">{item.tests}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue by Category</h3>
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                  <span className="text-sm text-gray-500">${category.revenue.toLocaleString()}</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(category.revenue / maxRevenue) * 100}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`h-full ${category.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Tests */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Tests</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Test Name</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Tests</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Revenue</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {topTests.map((test, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-300">#{index + 1}</span>
                        <span className="text-sm font-medium text-gray-900">{test.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-gray-600">{test.tests}</td>
                    <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">${test.revenue.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      {test.trend === 'up' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                          <TrendingUp className="w-3 h-3" />
                          Up
                        </span>
                      ) : test.trend === 'down' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                          <TrendingDown className="w-3 h-3" />
                          Down
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                          Stable
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Turnaround Time */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Turnaround Time Performance</h3>
          </div>
          <div className="p-6 space-y-4">
            {turnaroundData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">{item.category}</span>
                    {item.status === 'excellent' ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Target: {item.target}h</span>
                    <span className="text-sm font-medium text-gray-900">Avg: {item.avg}h</span>
                  </div>
                </div>
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute h-full bg-gray-300 rounded-full"
                    style={{ width: `${(item.avg / item.target) * 100}%` }}
                  />
                  <div 
                    className={`absolute h-full rounded-full ${
                      item.avg <= item.target ? 'bg-green-500' : 
                      item.avg <= item.target * 1.5 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((item.avg / item.target) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TestTube className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-gray-500">Tests/Day</span>
          </div>
          <p className="text-xl font-bold text-gray-900">150</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-green-600" />
            <span className="text-xs text-gray-500">Patients</span>
          </div>
          <p className="text-xl font-bold text-gray-900">2,850</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileCheck className="w-4 h-4 text-purple-600" />
            <span className="text-xs text-gray-500">Reports Issued</span>
          </div>
          <p className="text-xl font-bold text-gray-900">4,420</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-yellow-600" />
            <span className="text-xs text-gray-500">Critical</span>
          </div>
          <p className="text-xl font-bold text-gray-900">12</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw className="w-4 h-4 text-orange-600" />
            <span className="text-xs text-gray-500">Re-tests</span>
          </div>
          <p className="text-xl font-bold text-gray-900">45</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-pink-600" />
            <span className="text-xs text-gray-500">Accuracy</span>
          </div>
          <p className="text-xl font-bold text-gray-900">99.2%</p>
        </div>
      </div>
    </div>
  );
};

export default LabReports;

