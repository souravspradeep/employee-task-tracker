const pool = require('../config/database');

const health = async (req, res) => {
  try {
    const dbName = process.env.DB_NAME || null;

    // Check whether tables exist using to_regclass (returns null when not present)
    const result = await pool.query(
      "SELECT to_regclass('public.users') AS users_table, to_regclass('public.employees') AS employees_table, to_regclass('public.tasks') AS tasks_table"
    );

    const row = result.rows[0] || {};

    res.json({
      success: true,
      database: dbName,
      connected: true,
      tables: {
        users: !!row.users_table,
        employees: !!row.employees_table,
        tasks: !!row.tasks_table
      }
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      success: false,
      connected: false,
      error: error.message
    });
  }
};

module.exports = {
  health
};
