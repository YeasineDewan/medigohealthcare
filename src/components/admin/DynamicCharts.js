import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart as RechartsLineChart, Line, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DynamicCharts = ({ type = 'line', data, title, height = 300 }) => {
  const [chartData, setChartData] = useState(data || []);

  useEffect(() => {
    // Generate sample data if no data provided
    if (!data) {
      const sampleData = [
        { name: 'Jan', value: 4000, amount: 2400 },
        { name: 'Feb', value: 3000, amount: 1398 },
        { name: 'Mar', value: 2000, amount: 9800 },
        { name: 'Apr', value: 2780, amount: 3908 },
        { name: 'May', value: 1890, amount: 4800 },
        { name: 'Jun', value: 2390, amount: 3800 },
      ];
      setChartData(sampleData);
    } else {
      setChartData(data);
    }
  }, [data]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <div className="w-full" style={{ minHeight: height }}>
            <ResponsiveContainer width="100%" height={height} minWidth={0} minHeight={0}>
              <RechartsLineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        );
      case 'bar':
        return (
          <div className="w-full" style={{ minHeight: height }}>
            <ResponsiveContainer width="100%" height={height} minWidth={0} minHeight={0}>
              <RechartsBarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3b82f6" />
                <Bar dataKey="amount" fill="#10b981" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        );
      case 'pie':
        return (
          <div className="w-full" style={{ minHeight: height }}>
            <ResponsiveContainer width="100%" height={height} minWidth={0} minHeight={0}>
              <RechartsPieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {renderChart()}
    </motion.div>
  );
};

// Export individual chart components for easier usage
export const LineChart = ({ data, title, height = 300 }) => (
  <DynamicCharts type="line" data={data} title={title} height={height} />
);

export const BarChart = ({ data, title, height = 300 }) => (
  <DynamicCharts type="bar" data={data} title={title} height={height} />
);

export const PieChart = ({ data, title, height = 300 }) => (
  <DynamicCharts type="pie" data={data} title={title} height={height} />
);

export default DynamicCharts;
