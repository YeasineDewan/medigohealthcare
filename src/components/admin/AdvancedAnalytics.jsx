import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Users, Activity, Calendar, BarChart3, PieChart, LineChart, Download } from 'lucide-react';

export default function AdvancedAnalytics() {
  const [timeRange, setTimeRange] = useState('month');

  const metrics = [
    { label: 'Revenue Growth', value: '+24.5%', trend: 'up', icon: TrendingUp, color: 'green' },
    { label: 'Patient Growth', value: '+18.2%', trend: 'up', icon: Users, color: 'blue' },
    { label: 'Avg. Wait Time', value: '-12.3%', trend: 'down', icon: Activity, color: 'purple' },
    { label: 'Satisfaction', value: '94.8%', trend: 'up', icon: Activity, color: 'amber' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
        <div className="flex gap-2">
          {['week', 'month', 'quarter', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-[#5DBB63] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-${metric.color}-100 flex items-center justify-center`}>
                <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
              </div>
              <span className={`text-sm font-semibold ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.value}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm">{metric.label}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Revenue Trends</h3>
            <button className="text-sm text-[#5DBB63] hover:underline flex items-center gap-1">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
            <LineChart className="w-16 h-16 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Department Performance</h3>
            <button className="text-sm text-[#5DBB63] hover:underline flex items-center gap-1">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
            <PieChart className="w-16 h-16 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
