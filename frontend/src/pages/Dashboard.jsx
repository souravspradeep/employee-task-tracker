import { useState, useEffect } from 'react';
import { getDashboardStats } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getDashboardStats();
      setStats(response.data);
    } catch (err) {
      setError('Failed to load dashboard statistics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!stats) return <div>No data available</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Employees Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Employees</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalEmployees}</p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <span className="text-3xl">👥</span>
            </div>
          </div>
        </div>

        {/* Total Tasks Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalTasks}</p>
            </div>
            <div className="bg-purple-100 rounded-full p-3">
              <span className="text-3xl">📋</span>
            </div>
          </div>
        </div>

        {/* Completed Tasks Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Completed Tasks</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.completedTasks}</p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <span className="text-3xl">✅</span>
            </div>
          </div>
        </div>

        {/* Completion Rate Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Completion Rate</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.completionRate}%</p>
            </div>
            <div className="bg-yellow-100 rounded-full p-3">
              <span className="text-3xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks by Status */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Tasks by Status</h3>
        <div className="space-y-3">
          {stats.tasksByStatus.map((item) => (
            <div key={item.status} className="flex items-center justify-between">
              <span className="text-gray-600 capitalize">{item.status.replace('_', ' ')}</span>
              <span className="font-semibold text-gray-800">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;