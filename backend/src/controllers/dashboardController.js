const pool = require('../config/database');

const getDashboardStats = async (req, res) => {
  try {
    // For admins, show all stats; for regular users, show only their tasks
    if (req.user.role === 'admin') {
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
    } else {
      // Regular users only see their own task stats
      const myTasks = await pool.query(
        `SELECT COUNT(*) as count FROM tasks 
         WHERE employee_id IN (SELECT id FROM employees WHERE user_id = $1)`,
        [req.user.id]
      );

      const myCompletedTasks = await pool.query(
        `SELECT COUNT(*) as count FROM tasks 
         WHERE employee_id IN (SELECT id FROM employees WHERE user_id = $1)
         AND status = 'completed'`,
        [req.user.id]
      );

      const myTasksByStatus = await pool.query(
        `SELECT status, COUNT(*) as count FROM tasks 
         WHERE employee_id IN (SELECT id FROM employees WHERE user_id = $1)
         GROUP BY status`,
        [req.user.id]
      );

      const totalTasks = parseInt(myTasks.rows[0].count);
      const completed = parseInt(myCompletedTasks.rows[0].count);
      const completionRate = totalTasks > 0 ? ((completed / totalTasks) * 100).toFixed(1) : 0;

      res.json({
        success: true,
        data: {
          myTasks: totalTasks,
          completedTasks: completed,
          completionRate: parseFloat(completionRate),
          tasksByStatus: myTasksByStatus.rows
        }
      });
    }
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