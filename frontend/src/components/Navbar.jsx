const Navbar = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'employees', label: '👥 Employees' },
    { id: 'tasks', label: '✅ Tasks' },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold">Employee Task Tracker</h1>
          <div className="flex space-x-4">
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;