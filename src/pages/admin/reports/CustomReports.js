import { useState } from 'react';
import { motion } from 'framer-motion';
import ReportPageLayout from '../../../components/admin/reports/ReportPageLayout';
import { FileSpreadsheet, Plus, Filter, Download } from 'lucide-react';

const REPORT_TYPES = [
  { id: 'patients', label: 'Patients' },
  { id: 'appointments', label: 'Appointments' },
  { id: 'orders', label: 'Orders' },
  { id: 'lab', label: 'Lab Tests' },
  { id: 'inventory', label: 'Inventory' },
];

export default function CustomReports() {
  const [dateRange, setDateRange] = useState('this-month');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const toggleType = (id) => {
    setSelectedTypes((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  };

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 800);
  };

  return (
    <ReportPageLayout
      title="Custom Reports"
      description="Build and export reports with custom criteria"
      dateRange={dateRange}
      onDateRangeChange={setDateRange}
      onRefresh={() => setGenerated(false)}
      loading={false}
      onExport={() => window.print()}
    >
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#5DBB63]" />
            Select data sources
          </h2>
          <p className="text-sm text-gray-500 mb-4">Choose one or more modules to include in your custom report.</p>
          <div className="flex flex-wrap gap-3">
            {REPORT_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => toggleType(type.id)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  selectedTypes.includes(type.id)
                    ? 'bg-[#5DBB63] text-white border-[#5DBB63]'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-[#5DBB63]'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Date range</h2>
          <p className="text-sm text-gray-500">Using: <strong>{dateRange.replace(/-/g, ' ')}</strong> (select in header to change).</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleGenerate}
            disabled={loading || selectedTypes.length === 0}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? (
              <span className="animate-pulse">Generating…</span>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Generate report
              </>
            )}
          </button>
          {generated && (
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              <Download className="w-5 h-5" />
              Export / Print
            </button>
          )}
        </div>

        {generated && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-[#5DBB63]" />
              <h2 className="font-semibold text-gray-900">Custom report preview</h2>
            </div>
            <div className="p-6 text-sm text-gray-600">
              <p className="mb-2">Report includes: <strong>{selectedTypes.map((id) => REPORT_TYPES.find((t) => t.id === id)?.label).join(', ')}</strong></p>
              <p>Use <strong>Export / Print</strong> above to save as PDF or print. For full data, use the dedicated report for each module (Patient, Appointment, Sales, Lab, Inventory) and combine exports as needed.</p>
            </div>
          </motion.div>
        )}
      </div>
    </ReportPageLayout>
  );
}
