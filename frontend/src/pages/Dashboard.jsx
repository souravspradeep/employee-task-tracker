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

  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
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
    <div className="min-h-screen flex flex-col bg-gray-900">
      <div className="flex-1 max-w-[1800px] mx-auto px-4 py-8 w-full">

        <div className="mb-8">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">Dashboard</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-8">

            {[
              {
                label: isAdmin ? 'Total Employees' : 'Your Total Tasks',
                value: isAdmin ? stats.totalEmployees : stats.myTasks,
                icon: '👥',
                color: 'bg-blue-100',
                onClick: () => (isAdmin ? onNavigate('employees') : onNavigate('tasks')),
              },
              {
                label: isAdmin ? 'Total Tasks' : 'Completed Tasks',
                value: isAdmin ? stats.totalTasks : stats.completedTasks,
                icon: '📋',
                color: 'bg-purple-100',
                onClick: () => (isAdmin ? onNavigate('tasks') : onNavigate('tasks', { filterStatus: 'completed' })),
              },
              {
                label: isAdmin ? 'Completed Tasks' : 'Completion Rate',
                value: isAdmin ? stats.completedTasks : `${stats.completionRate}%`,
                icon: '✅',
                color: 'bg-green-100',
                onClick: () => onNavigate('tasks', { filterStatus: 'completed' }),
              },
              isAdmin && {
                label: 'Completion Rate',
                value: `${stats.completionRate}%`,
                icon: '📊',
                color: 'bg-yellow-100',
              },
            ]
              .filter(Boolean)
              .map((card, index) => (
                <div
                  key={index}
                  role="button"
                  onClick={card.onClick}
                  className="group bg-white p-6 rounded-2xl border border-white shadow-sm transition-all duration-200 cursor-pointer hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">{card.label}</p>
                      <p className="text-4xl font-bold text-gray-900 mt-1">{card.value}</p>
                    </div>

                    <div className={`${card.color} p-4 rounded-full text-3xl group-hover:scale-110 transition`}>
                      {card.icon}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Tasks by Status</h3>

            <div className="flex-1 flex items-center justify-center">
              <PieChart
                size={260}
                data={stats.tasksByStatus}
                onItemClick={(status) => onNavigate('tasks', { filterStatus: status })}
              />
            </div>
          </div>

        </div>
      </div>
      <footer className="mt-14 py-6 bg-gray-900 text-gray-300 text-center rounded-xl">
          <p className="text-sm">
            © {new Date().getFullYear()} Employee Task Tracker
          </p>
          <div className="flex justify-center gap-4 mt-2 text-sm">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition">Terms</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition">Support</a>
          </div>
        </footer>

    </div>
  );
};

export default Dashboard;