import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  RefreshCw,
  Plus,
  Printer,
  FileText,
  Upload,
  User,
  Fingerprint,
  Download,
  Edit3,
  Calendar,
  Filter,
  ChevronRight,
} from 'lucide-react';

// Mock candidate/bill data matching the reference table
const mockCandidates = [
  {
    id: 1,
    billNo: 'BL-2026-001',
    date: '05-MAR-26',
    patientId: '260300005314',
    name: 'FARHAD HOSSEN',
    refBy: 'VIC GLOBAL',
    agentName: 'BTA',
    dues: 0,
    billType: 'ONLINE',
    salesBy: 'Admin',
    facePreview: null,
    fingerPreview: null,
    uploadedFacePreview: null,
  },
  {
    id: 2,
    billNo: 'BL-2026-002',
    date: '05-MAR-26',
    patientId: '260300005315',
    name: 'MD EMAMUL SHEIKH',
    refBy: 'Self',
    agentName: 'BTA',
    dues: 500,
    billType: 'OFFLINE',
    salesBy: 'Staff',
    facePreview: null,
    fingerPreview: null,
    uploadedFacePreview: null,
  },
  {
    id: 3,
    billNo: 'BL-2026-003',
    date: '06-MAR-26',
    patientId: '260300005316',
    name: 'SARA AHMED',
    refBy: 'VIC GLOBAL',
    agentName: 'Agent A',
    dues: 0,
    billType: 'ONLINE',
    salesBy: 'Admin',
    facePreview: null,
    fingerPreview: null,
    uploadedFacePreview: null,
  },
];

export default function BillList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('candidate'); // candidate | complete
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [billTypeFilter, setBillTypeFilter] = useState({ OFFLINE: true, ONLINE: true });
  const [candidates, setCandidates] = useState(mockCandidates);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.billNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.patientId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBillType = billTypeFilter[c.billType];
    return matchesSearch && matchesBillType;
  });

  const toggleBillType = (type) => {
    setBillTypeFilter((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handlePrintInvoice = (row) => {
    window.open(`/admin/medical-checkup/report/${row.id}?print=invoice`, '_blank', 'width=800,height=600');
  };

  const handleRegForm = (row) => {
    window.print?.() || alert('Print registration form for ' + row.name);
  };

  const handleReportGenerate = (row) => {
    navigate(`/admin/medical-checkup/value-entry/${row.id}`);
  };

  const handleAddBill = () => {
    navigate('/admin/patients/registration-form');
  };

  return (
    <div className="space-y-4">
      {/* Header with tabs and search */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex rounded-lg border border-gray-300 overflow-hidden bg-white">
            <button
              onClick={() => setActiveTab('candidate')}
              className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === 'candidate' ? 'bg-[#1a5c2e] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Candidate List
            </button>
            <button
              onClick={() => setActiveTab('complete')}
              className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === 'complete' ? 'bg-[#1a5c2e] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Complete List
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search here by Bill No or Candidate ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
              />
            </div>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="From Date"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="To Date"
            />
            <button
              onClick={handleAddBill}
              className="flex items-center gap-2 px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Bill +
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Today</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Yesterday</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">This Week</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Update</button>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500">Filters:</span>
          <label className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm">
            <input
              type="checkbox"
              checked={billTypeFilter.OFFLINE}
              onChange={() => toggleBillType('OFFLINE')}
              className="rounded border-gray-300"
            />
            Bill Type like 'OFFLINE'
          </label>
          <label className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm">
            <input
              type="checkbox"
              checked={billTypeFilter.ONLINE}
              onChange={() => toggleBillType('ONLINE')}
              className="rounded border-gray-300"
            />
            Bill Type like 'ONLINE'
          </label>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-2.5 text-left font-semibold text-gray-600">Bill No</th>
                <th className="px-3 py-2.5 text-left font-semibold text-gray-600">Date</th>
                <th className="px-3 py-2.5 text-left font-semibold text-gray-600">Patient ID</th>
                <th className="px-3 py-2.5 text-left font-semibold text-gray-600">Name</th>
                <th className="px-3 py-2.5 text-left font-semibold text-gray-600">Invoice</th>
                <th className="px-3 py-2.5 text-left font-semibold text-gray-600">Reg. Form</th>
                <th className="px-3 py-2.5 text-left font-semibold text-gray-600">Upload Images</th>
                <th className="px-3 py-2.5 text-left font-semibold text-gray-600">Face</th>
                <th className="px-3 py-2.5 text-left font-semibold text-gray-600">Finger</th>
                <th className="px-3 py-2.5 text-left font-semibold text-gray-600">Uploaded Face</th>
                <th className="px-3 py-2.5 text-left font-semibold text-gray-600">Captured Face</th>
                <th className="px-3 py-2.5 text-left font-semibold text-gray-600">Captured Finger</th>
                <th className="px-3 py-2.5 text-left font-semibold text-gray-600">Report Generate</th>
                <th className="px-3 py-2.5 text-left font-semibold text-gray-600">Agent Name</th>
                <th className="px-3 py-2.5 text-left font-semibold text-gray-600">Ref By</th>
                <th className="px-3 py-2.5 text-left font-semibold text-gray-600">Dues</th>
                <th className="px-3 py-2.5 text-left font-semibold text-gray-600">Bill Type</th>
                <th className="px-3 py-2.5 text-left font-semibold text-gray-600 w-8"></th>
                <th className="px-3 py-2.5 text-left font-semibold text-gray-600">Sales By</th>
                <th className="px-3 py-2.5 text-left font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCandidates.map((row, index) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-sky-50/50' : 'bg-orange-50/30'}`}
                >
                  <td className="px-3 py-2 font-medium text-gray-900">{row.billNo}</td>
                  <td className="px-3 py-2 text-gray-600">{row.date}</td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => navigate(`/admin/patients/records?patientId=${row.patientId}`)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {row.patientId}
                    </button>
                  </td>
                  <td className="px-3 py-2 font-medium text-gray-900">{row.name}</td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => handlePrintInvoice(row)}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs font-medium"
                    >
                      Print
                    </button>
                  </td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => handleRegForm(row)}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-xs font-medium"
                    >
                      REG_FORM
                    </button>
                  </td>
                  <td className="px-3 py-2">
                    <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-xs font-medium flex items-center gap-1">
                      <Upload className="w-3 h-3" /> Upload
                    </button>
                  </td>
                  <td className="px-3 py-2">
                    <button className="p-1.5 rounded bg-gray-100 hover:bg-gray-200" title="Face">
                      <User className="w-4 h-4 text-gray-600" />
                    </button>
                  </td>
                  <td className="px-3 py-2">
                    <button className="p-1.5 rounded bg-gray-100 hover:bg-gray-200" title="Finger">
                      <Fingerprint className="w-4 h-4 text-gray-600" />
                    </button>
                  </td>
                  <td className="px-3 py-2">
                    {row.uploadedFacePreview ? (
                      <img src={row.uploadedFacePreview} alt="" className="w-10 h-10 rounded object-cover border" />
                    ) : (
                      <span className="text-gray-400 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    {row.facePreview ? (
                      <img src={row.facePreview} alt="" className="w-10 h-10 rounded object-cover border" />
                    ) : (
                      <span className="text-gray-400 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    {row.fingerPreview ? (
                      <img src={row.fingerPreview} alt="" className="w-10 h-10 rounded object-cover border" />
                    ) : (
                      <span className="text-gray-400 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => handleReportGenerate(row)}
                      className="px-2 py-1 bg-[#5DBB63] text-white rounded hover:bg-[#4CAF50] text-xs font-medium"
                    >
                      Input
                    </button>
                  </td>
                  <td className="px-3 py-2 text-gray-600">{row.agentName}</td>
                  <td className="px-3 py-2 text-gray-600">{row.refBy}</td>
                  <td className="px-3 py-2 font-medium">{row.dues === 0 ? '0' : row.dues}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${row.billType === 'ONLINE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {row.billType}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(row.id)}
                      onChange={(e) => {
                        setSelectedIds((prev) => {
                          const next = new Set(prev);
                          if (e.target.checked) next.add(row.id);
                          else next.delete(row.id);
                          return next;
                        });
                      }}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-3 py-2 text-gray-600">{row.salesBy}</td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => navigate(`/admin/medical-checkup/value-entry/${row.id}`)}
                      className="px-2 py-1 bg-amber-100 text-amber-800 rounded hover:bg-amber-200 text-xs font-medium"
                    >
                      Edit/Update
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
