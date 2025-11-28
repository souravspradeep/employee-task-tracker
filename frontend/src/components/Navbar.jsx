import { useAuth } from '../context/AuthContext';

const Navbar = ({ currentPage, onPageChange }) => {
  const { user, logout, isAdmin } = useAuth();
  const navItems = [
    { id: 'dashboard', label: '📊 Dashboard' },
    ...(isAdmin ? [{ id: 'employees', label: '👥 Employees' }] : []),
    { id: 'tasks', label: '✅ Tasks' },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div
            role="button"
            tabIndex={0}
            onClick={() => onPageChange && onPageChange('dashboard')}
            onKeyPress={(e) => { if (e.key === 'Enter') onPageChange && onPageChange('dashboard'); }}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <img src="/logo.svg" alt="Employee Task Tracker" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold select-none">Employee Task Tracker</span>
          </div>
          <div className="flex space-x-4 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-700 font-semibold'
                    : 'hover:bg-blue-500'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-blue-400">
              <div className="text-sm">
                  {/* Show 'ADMIN' for admins, otherwise show employee name (fallback to user.name or user.email) */}
                  <p className="font-semibold">{isAdmin ? 'ADMIN' : (user?.employee?.name || user?.name || user?.email)}</p>
                </div>
              <button
                onClick={logout}
                className="px-3 py-1 bg-red-500 rounded-md hover:bg-red-600 transition-colors text-sm font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;