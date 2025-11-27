const pool = require('../config/database');
const getDashboardStats = async (req, res) => {
  try {
    const employeeCount = await pool.query(
      'SELECT COUNT(*) as count FROM employees'
    );
    
    const taskCount = await pool.query(
      'SELECT COUNT(*) as count FROM tasks'
    );
    
    const tasksByStatus = await pool.query(
      `SELECT status, COUNT(*) as count
       FROM tasks
       GROUP BY status`
    );
    
    const completedTasks = await pool.query(
      `SELECT COUNT(*) as count FROM tasks WHERE status = 'completed'`
    );
    
    const totalTasks = parseInt(taskCount.rows[0].count);
    const completed = parseInt(completedTasks.rows[0].count);
    const completionRate = totalTasks > 0 ? ((completed / totalTasks) * 100).toFixed(1) : 0;
    
    res.json({
      success: true,
      data: {
        totalEmployees: parseInt(employeeCount.rows[0].count),
        totalTasks: totalTasks,
        completedTasks: completed,
        completionRate: parseFloat(completionRate),
        tasksByStatus: tasksByStatus.rows
      }
    });
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get dashboard stats'
    });
  }
};

module.exports = {
  getDashboardStats
};