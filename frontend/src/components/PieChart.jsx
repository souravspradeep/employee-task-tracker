import React from 'react';

const colorMap = {
  pending: '#f59e0b', // amber
  in_progress: '#3b82f6', // blue
  completed: '#10b981' // green
};

const formatLabel = (status) => status.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const PieChart = ({ data = [], size = 160, strokeWidth = 28, onItemClick = null }) => {
  const total = data.reduce((s, i) => s + Number(i.count || 0), 0);

  if (!data || data.length === 0 || total === 0) {
    return <div className="text-center text-sm text-gray-500">No data to display</div>;
  }

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;

  return (
    <div className="flex items-center justify-center space-x-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`translate(${size / 2}, ${size / 2}) rotate(-90)`}>
          {data.map((d) => {
            const value = Number(d.count || 0);
            const len = (value / total) * circumference;
            const dashArray = `${len} ${circumference - len}`;
            const dashOffset = -cumulative;
            cumulative += len;

            return (
              <circle
                key={d.status}
                r={radius}
                cx={0}
                cy={0}
                fill="transparent"
                stroke={colorMap[d.status] || '#9ca3af'}
                strokeWidth={strokeWidth}
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                strokeLinecap="butt"
                style={{ cursor: onItemClick ? 'pointer' : 'default' }}
                onClick={() => onItemClick && onItemClick(d.status)}
              />
            );
          })}
          {/* center hole */}
          <circle r={radius - strokeWidth / 1.7} cx={0} cy={0} fill="rgba(255,255,255,0.88)" />
        </g>
      </svg>

      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.status} className="flex items-center space-x-3" style={{ cursor: onItemClick ? 'pointer' : 'default' }} onClick={() => onItemClick && onItemClick(d.status)}>
            <span style={{ backgroundColor: colorMap[d.status] || '#9ca3af' }} className="w-3 h-3 rounded-full inline-block" />
            <div className="text-sm text-gray-700">
              <div className="font-medium">{formatLabel(d.status)}</div>
              <div className="text-gray-500">{d.count} ({((d.count / total) * 100).toFixed(1)}%)</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
