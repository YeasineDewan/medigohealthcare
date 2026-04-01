import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, DollarSign, Calendar, BarChart3 } from 'lucide-react';

const mockBudgets = [
  { id: 1, department: 'Pharmacy', budget: 500000, spent: 425000, category: 'Operational', period: 'Q1 2024', status: 'on-track' },
  { id: 2, department: 'Laboratory', budget: 300000, spent: 285000, category: 'Operational', period: 'Q1 2024', status: 'warning' },
  { id: 3, department: 'Emergency', budget: 400000, spent: 420000, category: 'Operational', period: 'Q1 2024', status: 'over-budget' },
  { id: 4, department: 'HR', budget: 800000, spent: 650000, category: 'Personnel', period: 'Q1 2024', status: 'on-track' },
  { id: 5, department: 'Marketing', budget: 150000, spent: 98000, category: 'Marketing', period: 'Q1 2024', status: 'on-track' },
];

export default function BudgetMonitoring() {
  const [budgets] = useState(mockBudgets);
  const [selectedPeriod, setSelectedPeriod] = useState('Q1 2024');

  const totalBudget = budgets.reduce((sum, b) => sum + b.budget, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const utilizationRate = ((totalSpent / totalBudget) * 100).toFixed(1);

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-track': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-amber-600 bg-amber-100';
      case 'over-budget': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-track': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'over-budget': return <TrendingDown className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Budget Monitoring</h2>
          <p className="text-gray-500 mt-1">Track and monitor departmental budgets</p>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
        >
          <option>Q1 2024</option>
          <option>Q2 2024</option>
          <option>Q3 2024</option>
          <option>Q4 2024</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${(totalBudget / 1000).toFixed(0)}K</h3>
          <p className="text-sm text-gray-600">Total Budget</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${(totalSpent / 1000).toFixed(0)}K</h3>
          <p className="text-sm text-gray-600">Total Spent</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{utilizationRate}%</h3>
          <p className="text-sm text-gray-600">Utilization Rate</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {budgets.filter(b => b.status !== 'on-track').length}
          </h3>
          <p className="text-sm text-gray-600">Alerts</p>
        </motion.div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Department Budget Overview</h3>
        <div className="space-y-6">
          {budgets.map((budget) => {
            const percentage = ((budget.spent / budget.budget) * 100).toFixed(1);
            const remaining = budget.budget - budget.spent;

            return (
              <div key={budget.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{budget.department}</h4>
                    <p className="text-sm text-gray-500">{budget.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(budget.status)}`}>
                        {getStatusIcon(budget.status)}
                        {budget.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Budget</p>
                    <p className="font-semibold text-gray-900">${budget.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Spent</p>
                    <p className="font-semibold text-gray-900">${budget.spent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Remaining</p>
                    <p className={`font-semibold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${Math.abs(remaining).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Utilization</span>
                    <span className={`text-sm font-semibold ${
                      percentage > 100 ? 'text-red-600' :
                      percentage > 90 ? 'text-amber-600' :
                      'text-green-600'
                    }`}>
                      {percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        percentage > 100 ? 'bg-red-600' :
                        percentage > 90 ? 'bg-amber-600' :
                        'bg-green-600'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Budget by Category</h3>
          <div className="space-y-3">
            {Object.entries(
              budgets.reduce((acc, b) => {
                acc[b.category] = (acc[b.category] || 0) + b.budget;
                return acc;
              }, {})
            ).map(([category, amount]) => (
              <div key={category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{category}</span>
                  <span className="text-sm text-gray-500">${amount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(amount / totalBudget) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Budget Alerts</h3>
          <div className="space-y-3">
            {budgets
              .filter(b => b.status !== 'on-track')
              .map((budget) => (
                <div key={budget.id} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{budget.department}</h4>
                    <p className="text-sm text-gray-600">
                      {budget.status === 'over-budget'
                        ? `Over budget by $${(budget.spent - budget.budget).toLocaleString()}`
                        : `Approaching budget limit (${((budget.spent / budget.budget) * 100).toFixed(1)}%)`}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
