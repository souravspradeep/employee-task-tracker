import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTasks, getEmployees, createTask, updateTask, deleteTask } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';

const Tasks = ({ initialFilters = {} }) => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState(initialFilters.filterStatus || '');
  const [filterEmployee, setFilterEmployee] = useState(initialFilters.filterEmployee || '');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    employee_id: '',
    due_date: ''
  });
  const { isAdmin, user } = useAuth();

  useEffect(() => {
    fetchData();
  }, [filterStatus, filterEmployee]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const filters = {};
      if (filterStatus) filters.status = filterStatus;
      
      // If user is not admin, only fetch their own tasks
      if (!isAdmin && user?.employee?.id) {
        filters.employee_id = user.employee.id;
      } else if (filterEmployee) {
        // Only admins can filter by employee
        filters.employee_id = filterEmployee;
      }
      
      const tasksResponse = await getTasks(filters);
      setTasks(tasksResponse.data);

      if (isAdmin) {
        const employeesResponse = await getEmployees();
        setEmployees(employeesResponse.data);
      } else {
        setEmployees([]);
      }
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(formData);
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        employee_id: '',
        due_date: ''
      });
      setShowAddForm(false);
      fetchData();
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      fetchData();
    } catch (err) {
      setError('Failed to update task status');
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        fetchData();
      } catch (err) {
        setError('Failed to delete task');
        console.error(err);
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Tasks</h2>
        {isAdmin && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            {showAddForm ? 'Cancel' : '+ Add Task'}
          </button>
        )}
      </div>

      <ErrorMessage message={error} />

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {isAdmin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Employee
              </label>
              <select
                value={filterEmployee}
                onChange={(e) => setFilterEmployee(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Employees</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Add Task Form */}
      {isAdmin && showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign to Employee *
                </label>
                <select
                  name="employee_id"
                  value={formData.employee_id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Create Task
            </button>
          </form>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h3>
                <p className="text-gray-600 mb-3">{task.description || 'No description provided'}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <StatusBadge status={task.status} />
                  <PriorityBadge priority={task.priority} />
                </div>

                <div className="text-sm text-gray-500 space-y-1">
                  <p>👤 Assigned to: <span className="font-medium">{task.employee_name}</span></p>
                  {task.due_date && (
                    <p>📅 Due: {new Date(task.due_date).toLocaleDateString()}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-2 ml-4">
                {isAdmin ? (
                  <>
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>

                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <div className="text-sm text-gray-600">&nbsp;</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No tasks found. {filterStatus ? 'Try changing filters.' : (isAdmin ? 'Add your first task!' : 'No tasks assigned yet.')}
          </p>
        </div>
      )}
    </div>
  );
};

export default Tasks;