import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    department: '',
    position: '',
  });
  const { register, loading, error } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(
      formData.email,
      formData.password,
      formData.name,
      formData.department,
      formData.position
    );
    if (!result.success) {
      console.error('Registration failed:', result.error);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/office-bg.jpg')",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Overlay for better form visibility (lighter, so the image shows through) */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.08)' }}></div>

      {/* Translucent glass card */}
      <div
        className="rounded-xl shadow-2xl p-8 w-full max-w-md relative z-10 backdrop-blur-lg"
        style={{
          backgroundColor: 'rgba(255,255,255,0.45)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
          border: '1px solid rgba(255,255,255,0.45)'
        }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600 text-lg font-medium">Employee Task Tracker</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              style={{ backgroundColor: 'rgba(255,255,255,0.88)' }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              style={{ backgroundColor: 'rgba(255,255,255,0.88)' }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Engineering"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              style={{ backgroundColor: 'rgba(255,255,255,0.88)' }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Position
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Developer"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              style={{ backgroundColor: 'rgba(255,255,255,0.88)' }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              style={{ backgroundColor: 'rgba(255,255,255,0.88)' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-700 font-bold underline"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
