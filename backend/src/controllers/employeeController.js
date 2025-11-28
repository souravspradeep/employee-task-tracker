const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const getAllEmployees = async (req, res) => {
  try {
    // Only admins can view all employees
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    const result = await pool.query(
      'SELECT id, user_id, name, email, department, position, created_at FROM employees ORDER BY name'
    );
    
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error getting employees:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get employees'
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params; 
    
    const result = await pool.query(
      'SELECT id, user_id, name, email, department, position, created_at FROM employees WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    const employee = result.rows[0];

    // Regular users can only view their own profile
    if (req.user.role !== 'admin' && employee.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    
    res.json({
      success: true,
      data: employee
    });
  } catch (error) {
    console.error('Error getting employee:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get employee'
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    // Only admins can create employees
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    const { name, email, department, position, user_id, temporary_password } = req.body;
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    // If admin provided a temporary password, create a user account (or reuse existing)
    let newUserId = user_id || null;

    // Start transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      if (temporary_password) {
        // Check if a user already exists with this email
        const existing = await client.query('SELECT id FROM users WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
          newUserId = existing.rows[0].id;
        } else {
          const hashed = await bcrypt.hash(temporary_password, 10);
          const userInsert = await client.query(
            'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id',
            [email, hashed, 'user']
          );
          newUserId = userInsert.rows[0].id;
        }
      }

      const empResult = await client.query(
        'INSERT INTO employees (user_id, name, email, department, position) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [newUserId, name, email, department, position]
      );

      await client.query('COMMIT');

      res.status(201).json({
        success: true,
        message: 'Employee created successfully',
        data: empResult.rows[0]
      });
    } catch (txErr) {
      await client.query('ROLLBACK');
      throw txErr;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error creating employee:', error);

    // If email already exists
    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create employee'
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, position } = req.body;

    // Get employee to check ownership
    const employee = await pool.query('SELECT user_id FROM employees WHERE id = $1', [id]);
    
    if (employee.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Check authorization: admin or own profile
    if (req.user.role !== 'admin' && employee.rows[0].user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const result = await pool.query(
      `UPDATE employees
       SET name = COALESCE($1, name),
           department = COALESCE($2, department),
           position = COALESCE($3, position)
       WHERE id = $4
       RETURNING *`,
      [name, department, position, id]
    );

    res.json({
      success: true,
      message: 'Employee updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update employee'
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Only admins can delete employees
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    const result = await pool.query(
      'DELETE FROM employees WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.json({
      success: true,
      message: 'Employee deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete employee'
    });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};