import { Link } from 'react-router-dom';
import { Calendar, Download, Printer, RefreshCw, ArrowLeft } from 'lucide-react';

const DATE_OPTIONS = [
  { value: 'today', label: 'Today' },
  { value: 'this-week', label: 'This Week' },
  { value: 'this-month', label: 'This Month' },
  { value: 'this-quarter', label: 'This Quarter' },
  { value: 'this-year', label: 'This Year' },
];

export default function ReportPageLayout({
  title,
  description,
  dateRange = 'this-month',
  onDateRangeChange,
  onExport,
  onPrint,
  onRefresh,
  loading = false,
  error = null,
  children,
  extraActions,
  showBack = true,
}) {
  const handleExport = () => {
    if (onExport) onExport();
    else window.print();
  };

  const handlePrint = () => {
    if (onPrint) onPrint();
    else window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          {showBack && (
            <Link
              to="/admin/reports"
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600"
              title="Back to Reports"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-500 mt-0.5">{description}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {onDateRangeChange && (
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => onDateRangeChange(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent bg-white text-sm"
              >
                {DATE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          )}
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-sm"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          )}
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] text-sm"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          {extraActions}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-10 h-10 text-[#5DBB63] animate-spin" />
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export { DATE_OPTIONS };
