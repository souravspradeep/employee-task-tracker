import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDashboardStats } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import PieChart from '../components/PieChart';

const Dashboard = ({ onNavigate }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const { isAdmin, user } = useAuth();

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
    <div className="min-h-full flex flex-col p-8 bg-gray-100">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* For Admins: Total Employees + Total Tasks, for Users: show personal task stats */}
        <div
          role="button"
          onClick={() => {
            if (isAdmin) onNavigate && onNavigate('employees');
            else onNavigate && onNavigate('tasks');
          }}
          className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">{isAdmin ? 'Total Employees' : 'Your Total Tasks'}</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{isAdmin ? stats.totalEmployees : stats.myTasks}</p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <span className="text-3xl">👥</span>
            </div>
          </div>
        </div>

        <div
          role="button"
          onClick={() => {
            if (isAdmin) onNavigate && onNavigate('tasks');
            else onNavigate && onNavigate('tasks', { filterStatus: 'completed' });
          }}
          className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">{isAdmin ? 'Total Tasks' : 'Completed Tasks'}</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{isAdmin ? stats.totalTasks : stats.completedTasks}</p>
            </div>
            <div className="bg-purple-100 rounded-full p-3">
              <span className="text-3xl">📋</span>
            </div>
          </div>
        </div>

        <div
          role="button"
          onClick={() => {
            // For admin: show tasks filtered by completed status
            if (isAdmin) onNavigate && onNavigate('tasks', { filterStatus: 'completed' });
            else onNavigate && onNavigate('tasks', { filterStatus: 'completed' });
          }}
          className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">{isAdmin ? 'Completed Tasks' : 'Completion Rate'}</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{isAdmin ? stats.completedTasks : `${stats.completionRate}%`}</p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <span className="text-3xl">✅</span>
            </div>
          </div>
        </div>

        {isAdmin && (
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
        )}
      </div>

      {/* Tasks by Status */}
      <div className="bg-white rounded-lg shadow-md p-6 flex-1 overflow-auto">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Tasks by Status</h3>
        <div className="flex flex-col items-center h-full justify-center">
          <PieChart data={stats.tasksByStatus} onItemClick={(status) => onNavigate && onNavigate('tasks', { filterStatus: status })} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;