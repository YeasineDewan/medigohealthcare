import { useState } from 'react';
import ReportPageLayout from '../../../components/admin/reports/ReportPageLayout';
import { Ambulance, AlertCircle, Clock, CheckCircle } from 'lucide-react';

// Placeholder data – replace with API when emergency module has report endpoint
const MOCK_SUMMARY = { total: 0, resolved: 0, avgResponse: '—' };
const MOCK_LIST = [];

export default function EmergencyReports() {
  const [dateRange, setDateRange] = useState('this-month');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(MOCK_SUMMARY);
  const [list, setList] = useState(MOCK_LIST);

  return (
    <ReportPageLayout
      title="Emergency Reports"
      description="Emergency cases, response times and outcomes"
      dateRange={dateRange}
      onDateRangeChange={setDateRange}
      onRefresh={() => {}}
      loading={loading}
      error={error}
      onExport={() => window.print()}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Cases</p>
                <p className="text-2xl font-bold text-gray-900">{summary.total}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Ambulance className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{summary.resolved}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Response</p>
                <p className="text-2xl font-bold text-blue-600">{summary.avgResponse}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-amber-600">{summary.total - summary.resolved}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-900">Emergency Cases</h2>
          </div>
          <div className="p-8 text-center text-gray-500">
            {list.length === 0 && 'No emergency cases in this period. Connect the Emergency module API to see data here.'}
          </div>
        </div>
      </div>
    </ReportPageLayout>
  );
}
