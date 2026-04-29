import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  TrendingDown,
  Activity,
  Heart,
  Brain,
  Weight,
  Thermometer,
  Zap,
  Target,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Settings,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2
} from 'lucide-react';

const HealthChart = ({ type = 'line', data = [], title, subtitle, height = 300 }) => {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [showGrid, setShowGrid] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Generate mock data based on chart type
    const generateMockData = () => {
      const periods = {
        day: 24,
        week: 7,
        month: 30,
        year: 12
      };

      const dataPoints = periods[selectedPeriod];
      const mockData = [];

      for (let i = 0; i < dataPoints; i++) {
        const baseValue = 50 + Math.random() * 50;
        mockData.push({
          label: getLabel(i, selectedPeriod),
          value: Math.round(baseValue),
          secondary: Math.round(baseValue * 0.8 + Math.random() * 20),
          tertiary: Math.round(baseValue * 0.6 + Math.random() * 15)
        });
      }

      return mockData;
    };

    const getLabel = (index, period) => {
      if (period === 'day') return `${index}:00`;
      if (period === 'week') return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index];
      if (period === 'month') return `${index + 1}`;
      if (period === 'year') => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index];
    };

    setTimeout(() => {
      setChartData(generateMockData());
      setIsLoading(false);
    }, 1000);
  }, [selectedPeriod]);

  useEffect(() => {
    if (!isLoading && canvasRef.current && chartData.length > 0) {
      drawChart();
    }
  }, [isLoading, chartData, type, showGrid, showLegend]);

  const drawChart = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas size
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Chart dimensions
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    // Draw grid
    if (showGrid) {
      drawGrid(ctx, padding, chartWidth, chartHeight);
    }

    // Draw chart based on type
    switch (type) {
      case 'line':
        drawLineChart(ctx, padding, chartWidth, chartHeight);
        break;
      case 'bar':
        drawBarChart(ctx, padding, chartWidth, chartHeight);
        break;
      case 'pie':
        drawPieChart(ctx, padding, chartWidth, chartHeight);
        break;
      case 'area':
        drawAreaChart(ctx, padding, chartWidth, chartHeight);
        break;
      default:
        drawLineChart(ctx, padding, chartWidth, chartHeight);
    }

    // Draw legend
    if (showLegend && type !== 'pie') {
      drawLegend(ctx, canvas.width, canvas.height);
    }
  };

  const drawGrid = (ctx, padding, width, height) => {
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;

    // Horizontal lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (height / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + width, y);
      ctx.stroke();
    }

    // Vertical lines
    for (let i = 0; i <= chartData.length; i++) {
      const x = padding + (width / chartData.length) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, padding + height);
      ctx.stroke();
    }
  };

  const drawLineChart = (ctx, padding, width, height) => {
    const maxValue = Math.max(...chartData.map(d => Math.max(d.value, d.secondary || 0)));
    const xStep = width / (chartData.length - 1);
    const yScale = height / maxValue;

    // Draw primary line
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    chartData.forEach((point, index) => {
      const x = padding + xStep * index;
      const y = padding + height - (point.value * yScale);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw secondary line if exists
    if (chartData[0].secondary) {
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      chartData.forEach((point, index) => {
        const x = padding + xStep * index;
        const y = padding + height - (point.secondary * yScale);
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    }

    // Draw data points
    chartData.forEach((point, index) => {
      const x = padding + xStep * index;
      const y = padding + height - (point.value * yScale);

      // Primary point
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Secondary point if exists
      if (point.secondary) {
        const y2 = padding + height - (point.secondary * yScale);
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(x, y2, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    chartData.forEach((point, index) => {
      const x = padding + xStep * index;
      ctx.fillText(point.label, x, padding + height + 20);
    });
  };

  const drawBarChart = (ctx, padding, width, height) => {
    const maxValue = Math.max(...chartData.map(d => d.value));
    const barWidth = width / chartData.length * 0.6;
    const xStep = width / chartData.length;
    const yScale = height / maxValue;

    chartData.forEach((point, index) => {
      const x = padding + xStep * index + (xStep - barWidth) / 2;
      const barHeight = point.value * yScale;
      const y = padding + height - barHeight;

      // Draw bar
      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(1, '#1d4ed8');
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw value on top
      ctx.fillStyle = '#374151';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(point.value, x + barWidth / 2, y - 5);

      // Draw label
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px sans-serif';
      ctx.fillText(point.label, x + barWidth / 2, padding + height + 20);
    });
  };

  const drawPieChart = (ctx, padding, width, height) => {
    const centerX = padding + width / 2;
    const centerY = padding + height / 2;
    const radius = Math.min(width, height) / 2 - 20;
    
    const total = chartData.reduce((sum, d) => sum + d.value, 0);
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    
    let currentAngle = -Math.PI / 2;
    
    chartData.forEach((point, index) => {
      const sliceAngle = (point.value / total) * Math.PI * 2;
      
      // Draw slice
      ctx.fillStyle = colors[index % colors.length];
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();
      
      // Draw label
      const labelAngle = currentAngle + sliceAngle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${Math.round((point.value / total) * 100)}%`, labelX, labelY);
      
      currentAngle += sliceAngle;
    });
    
    // Draw legend
    const legendX = centerX + radius + 20;
    const legendY = centerY - (chartData.length * 20) / 2;
    
    chartData.forEach((point, index) => {
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(legendX, legendY + index * 25, 15, 15);
      
      ctx.fillStyle = '#374151';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(point.label, legendX + 20, legendY + index * 25 + 12);
    });
  };

  const drawAreaChart = (ctx, padding, width, height) => {
    const maxValue = Math.max(...chartData.map(d => d.value));
    const xStep = width / (chartData.length - 1);
    const yScale = height / maxValue;

    // Create gradient
    const gradient = ctx.createLinearGradient(0, padding, 0, padding + height);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');

    // Draw area
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(padding, padding + height);
    chartData.forEach((point, index) => {
      const x = padding + xStep * index;
      const y = padding + height - (point.value * yScale);
      ctx.lineTo(x, y);
    });
    ctx.lineTo(padding + width, padding + height);
    ctx.closePath();
    ctx.fill();

    // Draw line on top
    drawLineChart(ctx, padding, width, height);
  };

  const drawLegend = (ctx, canvasWidth, canvasHeight) => {
    const legends = [
      { label: 'Primary', color: '#3b82f6' },
      { label: 'Secondary', color: '#10b981' }
    ];

    const legendX = canvasWidth - 100;
    const legendY = 10;

    legends.forEach((legend, index) => {
      ctx.fillStyle = legend.color;
      ctx.fillRect(legendX, legendY + index * 20, 12, 12);
      
      ctx.fillStyle = '#374151';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(legend.label, legendX + 16, legendY + index * 20 + 10);
    });
  };

  const ChartIcon = () => {
    switch (type) {
      case 'bar':
        return <BarChart3 className="w-5 h-5" />;
      case 'pie':
        return <PieChart className="w-5 h-5" />;
      case 'area':
        return <Activity className="w-5 h-5" />;
      default:
        return <LineChart className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl shadow-lg p-6 ${isFullscreen ? 'fixed inset-0 z-50 m-0' : ''}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <ChartIcon />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Period Selector */}
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>

          {/* Chart Type Selector */}
          <select
            value={type}
            onChange={(e) => {/* Handle type change */}}
            className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="line">Line</option>
            <option value="bar">Bar</option>
            <option value="area">Area</option>
            <option value="pie">Pie</option>
          </select>

          {/* Toggle Buttons */}
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-2 rounded-lg ${showGrid ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Filter className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowLegend(!showLegend)}
            className={`p-2 rounded-lg ${showLegend ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
            <Download className="w-4 h-4" />
          </button>

          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative" style={{ height: isFullscreen ? 'calc(100vh - 200px)' : height }}>
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ minHeight: '300px' }}
          />
        )}
      </div>

      {/* Stats Summary */}
      {!isFullscreen && (
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">Average</p>
            <p className="text-lg font-semibold text-gray-900">
              {chartData.length > 0 ? Math.round(chartData.reduce((sum, d) => sum + d.value, 0) / chartData.length) : 0}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Peak</p>
            <p className="text-lg font-semibold text-gray-900">
              {chartData.length > 0 ? Math.max(...chartData.map(d => d.value)) : 0}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Trend</p>
            <p className="text-lg font-semibold text-green-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12%
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default HealthChart;
