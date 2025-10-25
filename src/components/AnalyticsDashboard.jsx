import React from 'react';

const AnalyticsDashboard = () => {
  const analyticsData = {
    revenue: { current: 12847, previous: 9845, growth: 30.5 },
    users: { current: 1247, previous: 987, growth: 26.3 },
    orders: { current: 342, previous: 278, growth: 23.0 },
    conversion: { current: 4.2, previous: 3.5, growth: 20.0 }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Analytics Overview</h2>
        <select className="border border-gray-300 rounded-lg px-4 py-2">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue Chart Placeholder */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Trend</h3>
          <div className="h-64 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Revenue Chart Visualization</p>
          </div>
        </div>

        {/* User Growth Chart Placeholder */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl border border-green-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">User Growth</h3>
          <div className="h-64 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
            <p className="text-gray-500">User Growth Chart</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(analyticsData).map(([key, data]) => (
          <div key={key} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 capitalize">{key.replace('_', ' ')}</p>
            <p className="text-2xl font-bold text-gray-800">
              {key === 'revenue' ? '$' : ''}{data.current.toLocaleString()}
              {key === 'conversion' ? '%' : ''}
            </p>
            <p className={`text-sm ${data.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
              ↑ {data.growth}% from previous period
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;