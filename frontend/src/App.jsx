import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Tasks from './pages/Tasks';
import Login from './pages/Login';
import Register from './pages/Register';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [pageParams, setPageParams] = useState({});
  const [authPage, setAuthPage] = useState('login');

  const { isAuthenticated, loading, authError } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return authPage === 'login' ? (
      <Login
        onSwitchToRegister={() => setAuthPage('register')}
        errorMessage={authError || null}
      />
    ) : (
      <Register
        onSwitchToLogin={() => setAuthPage('login')}
        errorMessage={authError || null}
      />
    );
  }

  const setPage = (page, params = {}) => {
    setCurrentPage(page);
    setPageParams(params || {});
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setPage} />;
      case 'employees':
        return <Employees />;
      case 'tasks':
        return <Tasks initialFilters={pageParams} />;
      default:
        return <Dashboard onNavigate={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar currentPage={currentPage} onPageChange={setPage} />

      {currentPage === 'dashboard' ? (
        <main style={{ minHeight: 'calc(100vh - 64px)' }} className="w-full bg-gray-100">
          {renderPage()}
        </main>
      ) : (
        <main className="container mx-auto px-4 py-8">
          {renderPage()}
        </main>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
