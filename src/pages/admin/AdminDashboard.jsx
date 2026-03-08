import { motion } from 'framer-motion';
import { Users, Stethoscope, Calendar, ShoppingCart, TrendingUp, ArrowUpRight, Package, FlaskConical, TestTube, Microscope, Activity, DollarSign, Clock, BarChart3, PieChart, Filter, Search, AlertTriangle, CheckCircle, Eye, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SpecimenManagement from "../../components/admin/SpecimenManagement";
import TestCategoriesManagement from "../../components/admin/TestCategoriesManagement";

// Test Categories from the provided image
const testCategories = [
  { name: 'AUDIOLOGY', department: 'ENT (Ear, Nose & Thyroid)', tests: 12, revenue: 45000, status: 'active' },
  { name: 'HORMONAL', department: 'LAB', tests: 28, revenue: 89000, status: 'active' },
  { name: 'Molecular Biology', department: 'LAB', tests: 15, revenue: 120000, status: 'active' },
  { name: 'ENDOSCOPY REPORT', department: 'GASTROENTEROLOGY', tests: 8, revenue: 34000, status: 'active' },
  { name: 'OTHERS REPORT', department: 'GENERAL', tests: 6, revenue: 12000, status: 'inactive' },
  { name: 'UROLOGY REPORT', department: 'UROLOGY', tests: 10, revenue: 28000, status: 'active' },
  { name: 'FNAC REPORT', department: 'PATHOLOGY', tests: 14, revenue: 42000, status: 'active' },
  { name: 'CYTO-PATHOLOGY REPORT', department: 'PATHOLOGY', tests: 18, revenue: 67000, status: 'active' },
  { name: 'CLINICAL PATHOLOGY REPORT', department: 'PATHOLOGY', tests: 22, revenue: 78000, status: 'active' },
  { name: 'BLOOD TRANSFUSION & BLOOD BANK', department: 'HEMATOLOGY', tests: 9, revenue: 31000, status: 'active' },
  { name: 'IMMUNOLOGY REPORT', department: 'IMMUNOLOGY', tests: 16, revenue: 56000, status: 'active' },
  { name: 'HEMATOLOGY REPORT', department: 'HEMATOLOGY', tests: 25, revenue: 98000, status: 'active' },
  { name: 'ECHO REPORT', department: 'CARDIOLOGY', tests: 11, revenue: 87000, status: 'active' },
  { name: 'HISTO-PATHOLOGY REPORT', department: 'PATHOLOGY', tests: 20, revenue: 89000, status: 'active' },
  { name: 'ECG REPORT', department: 'CARDIOLOGY', tests: 13, revenue: 45000, status: 'active' },
];

// Specimen Types
const specimenTypes = [
  { name: 'EDTA PLASMA', usage: 245, category: 'Blood Tests', trend: 'up' },
  { name: 'NG SERUM & SODIUM FLUORIDE PLASMA', usage: 189, category: 'Metabolic', trend: 'up' },
  { name: 'EDTA WHOLE BLOOD', usage: 312, category: 'Hematology', trend: 'stable' },
  { name: 'SPUTUM', usage: 98, category: 'Microbiology', trend: 'down' },
  { name: 'SODIUM CITRATE PLASMA', usage: 156, category: 'Coagulation', trend: 'up' },
  { name: 'LITHIUM HEPARIN BLOOD', usage: 201, category: 'Blood Tests', trend: 'up' },
  { name: 'ASCITIC FLUID', usage: 45, category: 'Fluid Analysis', trend: 'stable' },
  { name: 'SWAB', usage: 134, category: 'Microbiology', trend: 'up' },
  { name: 'NAIL CLIP', usage: 67, category: 'Dermatology', trend: 'stable' },
  { name: 'PROSTATE SMEAR', usage: 89, category: 'Urology', trend: 'up' },
  { name: 'SKIN SCRAP', usage: 78, category: 'Dermatology', trend: 'stable' },
  { name: 'STOOL', usage: 145, category: 'Gastroenterology', trend: 'up' },
  { name: 'URINE', usage: 289, category: 'Urinalysis', trend: 'up' },
  { name: 'BODY FLUID', usage: 56, category: 'Fluid Analysis', trend: 'stable' },
  { name: 'SERUM & EDTA WHOLE BLOOD', usage: 178, category: 'Blood Tests', trend: 'up' },
  { name: 'SODIUM CITRATE BLOOD', usage: 123, category: 'Coagulation', trend: 'stable' },
  { name: 'PUS', usage: 34, category: 'Microbiology', trend: 'down' },
  { name: 'BLOOD', usage: 423, category: 'Blood Tests', trend: 'up' },
  { name: 'FLUID', usage: 89, category: 'Fluid Analysis', trend: 'stable' },
  { name: '24HRS URINE & URINE VOLUME', usage: 67, category: 'Urinalysis', trend: 'up' },
  { name: 'SERUM & SODIUM FLUORIDE PLASMA', usage: 145, category: 'Metabolic', trend: 'up' },
  { name: 'VAGINAL SWAB', usage: 98, category: 'Gynecology', trend: 'stable' },
  { name: 'THROAT SWAB', usage: 112, category: 'Microbiology', trend: 'up' },
  { name: 'SMEAR', usage: 76, category: 'Pathology', trend: 'stable' },
  { name: 'SERUM', usage: 367, category: 'Blood Tests', trend: 'up' },
  { name: 'SPOT URINE', usage: 134, category: 'Urinalysis', trend: 'up' },
  { name: 'RANDOM URINE', usage: 156, category: 'Urinalysis', trend: 'up' },
  { name: 'HAIR PLUCK', usage: 23, category: 'Dermatology', trend: 'stable' },
  { name: 'PLEURAL FLUID', usage: 41, category: 'Fluid Analysis', trend: 'stable' },
  { name: 'TRACHEAL ASPIRATE', usage: 28, category: 'Respiratory', trend: 'down' },
  { name: 'SEMEN', usage: 56, category: 'Andrology', trend: 'stable' },
];

const stats = [
  { label: 'Total Patients', value: '24,892', icon: Users, color: 'bg-[#5DBB63]', change: '+12%' },
  { label: 'Doctors', value: '156', icon: Stethoscope, color: 'bg-[#165028]', change: '+5' },
  { label: 'Appointments Today', value: '89', icon: Calendar, color: 'bg-blue-500', change: '+8' },
  { label: 'Orders This Month', value: '1,234', icon: ShoppingCart, color: 'bg-amber-500', change: '+23%' },
  { label: 'Lab Tests Today', value: '456', icon: TestTube, color: 'bg-purple-500', change: '+15%' },
  { label: 'Specimen Processed', value: '1,789', icon: Microscope, color: 'bg-indigo-500', change: '+18%' },
  { label: 'Revenue Today', value: '$12,456', icon: DollarSign, color: 'bg-green-500', change: '+22%' },
  { label: 'Critical Results', value: '3', icon: AlertTriangle, color: 'bg-red-500', change: '-2' },
];

const recentAppointments = [
  { id: 1, patient: 'Ahmed Khan', doctor: 'Dr. Fatima Rahman', time: '10:00 AM', status: 'confirmed' },
  { id: 2, patient: 'Sara Ali', doctor: 'Dr. Karim Ahmed', time: '10:30 AM', status: 'pending' },
  { id: 3, patient: 'Rahman Hossain', doctor: 'Dr. Nusrat Jahan', time: '11:00 AM', status: 'confirmed' },
  { id: 4, patient: 'Maria Islam', doctor: 'Dr. Ahmed Hassan', time: '11:30 AM', status: 'completed' },
];

const quickLinks = [
  { to: '/admin/doctors', label: 'Manage Doctors', icon: Stethoscope },
  { to: '/admin/patients', label: 'View Patients', icon: Users },
  { to: '/admin/appointments', label: 'Doctor Appointments', icon: Calendar },
  { to: '/admin/inventory', label: 'Inventory', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/admin/lab-tests', label: 'Lab Tests', icon: TestTube },
  { to: '/admin/categories', label: 'Test Categories', icon: FlaskConical },
  { to: '/admin/reports', label: 'Reports', icon: BarChart3 },
];

export default function AdminDashboard() {
  const [searchTerm, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  const filteredSpecimens = specimenTypes.filter(specimen => 
    specimen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    specimen.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCategories = testCategories.filter(category => 
    selectedCategory === 'all' || category.department === selectedCategory
  );

  const departmentOptions = ['all', ...new Set(testCategories.map(cat => cat.department))];

  const totalSpecimenUsage = specimenTypes.reduce((sum, specimen) => sum + specimen.usage, 0);
  const totalRevenue = testCategories.reduce((sum, category) => sum + category.revenue, 0);
  const activeCategories = testCategories.filter(cat => cat.status === 'active').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#111827]">Dynamic Lab Dashboard</h1>
        <p className="text-gray-500 mt-1">Comprehensive laboratory management and analysis platform</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 bg-white rounded-xl p-1 border border-gray-200">
        {['overview', 'specimens', 'categories', 'analytics'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab
                ? 'bg-[#5DBB63] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-[#111827] mt-1">{stat.value}</p>
                <p className={`text-sm font-medium mt-1 ${
                  stat.change.startsWith('+') ? 'text-[#5DBB63]' : 'text-red-600'
                }`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Overview Tab Content */}
      {activeTab === 'overview' && (
        <>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Appointments */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-[#111827]">Today's Appointments</h2>
                <Link to="/admin/appointments" className="text-[#5DBB63] font-medium text-sm flex items-center gap-1">
                  View all <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-[#111827]">{apt.patient}</p>
                      <p className="text-sm text-gray-500">{apt.doctor} · {apt.time}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        apt.status === 'confirmed'
                          ? 'bg-[#f0fdf2] text-[#165028]'
                          : apt.status === 'pending'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <h2 className="font-semibold text-[#111827] mb-6">Quick Actions</h2>
              <div className="space-y-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f0fdf2] transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#f0fdf2] flex items-center justify-center group-hover:bg-[#5DBB63]/20">
                      <link.icon className="w-5 h-5 text-[#5DBB63]" />
                    </div>
                    <span className="font-medium text-[#111827]">{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-[#5DBB63]" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Revenue Overview */}
          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-[#111827]">Revenue & Performance Overview</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-[#f0fdf2] text-[#165028] rounded-lg">Daily</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Weekly</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Monthly</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-32 flex items-center justify-center bg-gradient-to-br from-[#f0fdf2] to-[#dcfce7] rounded-xl">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-2 text-[#5DBB63]" />
                  <p className="text-2xl font-bold text-[#111827]">${totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                </div>
              </div>
              <div className="h-32 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="text-center">
                  <Activity className="w-12 h-12 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold text-[#111827]">{totalSpecimenUsage}</p>
                  <p className="text-sm text-gray-600">Specimens Processed</p>
                </div>
              </div>
              <div className="h-32 flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="text-center">
                  <FlaskConical className="w-12 h-12 mx-auto mb-2 text-purple-600" />
                  <p className="text-2xl font-bold text-[#111827]">{activeCategories}</p>
                  <p className="text-sm text-gray-600">Active Categories</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Categories Tab Content */}
      {activeTab === 'categories' && (
        <TestCategoriesManagement />
      )}

      {/* Specimens Tab Content */}
      {activeTab === 'specimens' && (
        <SpecimenManagement />
      )}

      {/* Analytics Tab Content */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Top Specimen</h3>
                <TestTube className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-xl font-bold text-gray-900">BLOOD</p>
              <p className="text-sm text-gray-500">423 tests this month</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Top Category</h3>
                <FlaskConical className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-xl font-bold text-gray-900">HEMATOLOGY REPORT</p>
              <p className="text-sm text-gray-500">$98,000 revenue</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Avg. Processing</h3>
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <p className="text-xl font-bold text-gray-900">2.4 hours</p>
              <p className="text-sm text-gray-500">Across all tests</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Success Rate</h3>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-xl font-bold text-gray-900">98.5%</p>
              <p className="text-sm text-gray-500">Test completion</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Specimen Usage Trends</h2>
              <div className="space-y-4">
                {specimenTypes.slice(0, 5).map((specimen) => (
                  <div key={specimen.name} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{specimen.name}</span>
                        <span className="text-sm text-gray-500">{specimen.usage}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(specimen.usage / 423) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Revenue by Department</h2>
              <div className="space-y-4">
                {Object.entries(
                  testCategories.reduce((acc, cat) => {
                    acc[cat.department] = (acc[cat.department] || 0) + cat.revenue;
                    return acc;
                  }, {})
                ).map(([dept, revenue]) => (
                  <div key={dept} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{dept}</span>
                        <span className="text-sm text-gray-500">${revenue.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(revenue / totalRevenue) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
