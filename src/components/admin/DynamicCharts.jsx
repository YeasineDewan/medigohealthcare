import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Simple chart components without external dependencies
export function LineChart({ data = [], width = 400, height = 200, color = '#5DBB63' }) {
  const canvasRef = useRef(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data.length) return;

    const ctx = canvas.getContext('2d');
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Find min and max values
    const values = data.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const valueRange = maxValue - minValue || 1;

    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw line
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.forEach((point, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index;
      const y = height - padding - ((point.value - minValue) / valueRange) * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw points
    data.forEach((point, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index;
      const y = height - padding - ((point.value - minValue) / valueRange) * chartHeight;

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();

      // Draw hover effect
      if (hoveredPoint === index) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.stroke();

        // Draw tooltip
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(x - 30, y - 40, 60, 25);
        ctx.fillStyle = 'white';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(point.value.toString(), x, y - 22);
      }
    });

    // Draw labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';

    // X-axis labels
    data.forEach((point, index) => {
      if (index % Math.ceil(data.length / 6) === 0) {
        const x = padding + (chartWidth / (data.length - 1)) * index;
        ctx.fillText(point.label, x, height - padding + 20);
      }
    });

    // Y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = minValue + (valueRange / 5) * (5 - i);
      const y = padding + (chartHeight / 5) * i;
      ctx.fillText(Math.round(value).toString(), padding - 10, y + 4);
    }

  }, [data, width, height, color, hoveredPoint]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const padding = 40;
    const chartWidth = width - padding * 2;
    
    const index = Math.round(((x - padding) / chartWidth) * (data.length - 1));
    
    if (index >= 0 && index < data.length) {
      setHoveredPoint(index);
    } else {
      setHoveredPoint(null);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredPoint(null)}
      className="w-full h-full"
    />
  );
}

export function BarChart({ data = [], width = 400, height = 200, color = '#5DBB63' }) {
  const canvasRef = useRef(null);
  const [hoveredBar, setHoveredBar] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data.length) return;

    const ctx = canvas.getContext('2d');
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Find max value
    const maxValue = Math.max(...data.map(d => d.value));

    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw bars
    const barWidth = chartWidth / data.length * 0.6;
    const barSpacing = chartWidth / data.length;

    data.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * chartHeight;
      const x = padding + barSpacing * index + (barSpacing - barWidth) / 2;
      const y = height - padding - barHeight;

      // Draw bar
      ctx.fillStyle = hoveredBar === index ? color : color + 'cc';
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw hover effect
      if (hoveredBar === index) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, barWidth, barHeight);

        // Draw tooltip
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(x + barWidth / 2 - 30, y - 40, 60, 25);
        ctx.fillStyle = 'white';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(item.value.toString(), x + barWidth / 2, y - 22);
      }
    });

    // Draw labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';

    // X-axis labels
    data.forEach((item, index) => {
      const x = padding + barSpacing * index + barSpacing / 2;
      ctx.fillText(item.label, x, height - padding + 20);
    });

    // Y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = (maxValue / 5) * (5 - i);
      const y = padding + (chartHeight / 5) * i;
      ctx.fillText(Math.round(value).toString(), padding - 10, y + 4);
    }

  }, [data, width, height, color, hoveredBar]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const barSpacing = chartWidth / data.length;
    
    const index = Math.floor((x - padding) / barSpacing);
    
    if (index >= 0 && index < data.length) {
      setHoveredBar(index);
    } else {
      setHoveredBar(null);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredBar(null)}
      className="w-full h-full"
    />
  );
}

export function PieChart({ data = [], width = 300, height = 300 }) {
  const canvasRef = useRef(null);
  const [hoveredSegment, setHoveredSegment] = useState(null);

  const colors = [
    '#5DBB63', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6',
    '#EC4899', '#14B8A6', '#F97316', '#06B6D4', '#84CC16'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data.length) return;

    const ctx = canvas.getContext('2d');
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 40;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0);

    // Draw segments
    let currentAngle = -Math.PI / 2;

    data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      
      // Draw segment
      ctx.fillStyle = colors[index % colors.length];
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      
      if (hoveredSegment === index) {
        // Offset for hover effect
        const offsetAngle = currentAngle + sliceAngle / 2;
        const offsetX = Math.cos(offsetAngle) * 10;
        const offsetY = Math.sin(offsetAngle) * 10;
        ctx.arc(centerX + offsetX, centerY + offsetY, radius, currentAngle, currentAngle + sliceAngle);
      } else {
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      }
      
      ctx.closePath();
      ctx.fill();

      // Draw border
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw label
      const labelAngle = currentAngle + sliceAngle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

      ctx.fillStyle = 'white';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const percentage = ((item.value / total) * 100).toFixed(1);
      ctx.fillText(`${percentage}%`, labelX, labelY);

      currentAngle += sliceAngle;
    });

    // Draw legend
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    
    data.forEach((item, index) => {
      const legendY = 20 + index * 20;
      const legendX = width - 120;
      
      // Color box
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(legendX, legendY - 8, 12, 12);
      
      // Label
      ctx.fillStyle = '#374151';
      ctx.fillText(item.label, legendX + 20, legendY);
      
      // Value
      ctx.fillStyle = '#6b7280';
      ctx.fillText(`(${item.value})`, legendX + 80, legendY);
    });

  }, [data, width, height, hoveredSegment]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 40;
    
    // Calculate angle from center
    const angle = Math.atan2(y - centerY, x - centerX);
    const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
    
    if (distance <= radius) {
      // Find which segment
      const total = data.reduce((sum, item) => sum + item.value, 0);
      let currentAngle = -Math.PI / 2;
      
      for (let i = 0; i < data.length; i++) {
        const sliceAngle = (data[i].value / total) * 2 * Math.PI;
        
        if (angle >= currentAngle && angle < currentAngle + sliceAngle) {
          setHoveredSegment(i);
          return;
        }
        
        currentAngle += sliceAngle;
      }
    }
    
    setHoveredSegment(null);
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredSegment(null)}
      className="w-full h-full"
    />
  );
}

export function ProgressChart({ value = 0, max = 100, label = '', color = '#5DBB63', size = 'medium' }) {
  const sizes = {
    small: { width: 120, height: 80 },
    medium: { width: 200, height: 120 },
    large: { width: 300, height: 180 }
  };

  const { width, height } = sizes[size] || sizes.medium;
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative"
    >
      <svg width={width} height={height} className="w-full h-full">
        {/* Background circle */}
        <circle
          cx={width / 2}
          cy={height / 2 - 10}
          r={Math.min(width, height) / 2 - 20}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={width / 2}
          cy={height / 2 - 10}
          r={Math.min(width, height) / 2 - 20}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: percentage / 100 }}
          transform={`rotate(-90 ${width / 2} ${height / 2 - 10})`}
          style={{
            pathLength: 1,
            origin: 'center'
          }}
        />
        
        {/* Text */}
        <text
          x={width / 2}
          y={height / 2 - 10}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-gray-900 font-bold"
          style={{ fontSize: size === 'small' ? '16px' : size === 'large' ? '24px' : '20px' }}
        >
          {Math.round(percentage)}%
        </text>
        
        <text
          x={width / 2}
          y={height - 10}
          textAnchor="middle"
          className="fill-gray-600 text-sm"
        >
          {label}
        </text>
      </svg>
    </motion.div>
  );
}

export function MetricCard({ title, value, change, icon: Icon, color = 'blue', trend = 'up' }) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm font-medium mt-1 flex items-center gap-1 ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend === 'up' ? '↑' : '↓'} {change}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}
