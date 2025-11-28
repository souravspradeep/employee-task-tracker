import { useAuth } from '../context/AuthContext';

const Navbar = ({ currentPage, onPageChange }) => {
  const { user, logout, isAdmin } = useAuth();

  const navItems = [
    { id: 'dashboard', label: '📊 Dashboard' },
    ...(isAdmin ? [{ id: 'employees', label: '👥 Employees' }] : []),
    { id: 'tasks', label: '✅ Tasks' },
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900 text-white shadow-2xl w-full">
      <div className="flex items-center justify-between h-16 w-full px-4">

        {/* Logo + Title */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onPageChange && onPageChange('dashboard')}
          onKeyPress={(e) => { if (e.key === 'Enter') onPageChange && onPageChange('dashboard'); }}
          className="flex items-center space-x-3 cursor-pointer select-none"
        >
          <img src="/logo.svg" alt="Employee Task Tracker" className="w-10 h-10 object-contain" />

          {/* Embossed 3D Title */}
          <span className="text-2xl font-extrabold tracking-wide relative inline-block text-white drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
            Employee Task Tracker
          </span>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`px-4 py-2 rounded-md transition-all duration-200 font-semibold shadow-sm ${
                currentPage === item.id
                  ? 'bg-blue-900 text-white scale-105 shadow-md'
                  : 'hover:bg-blue-600'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* User + Logout */}
          <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-blue-400/50">
            <div className="text-sm">
              <p className="font-semibold">
                {isAdmin ? 'ADMIN' : (user?.employee?.name || user?.name || user?.email)}
              </p>
            </div>

            <button
              onClick={logout}
              className="px-3 py-1 bg-red-500 rounded-md hover:bg-red-600 transition-colors text-sm font-semibold shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
