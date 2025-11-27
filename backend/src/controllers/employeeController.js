const pool = require('../config/database');

const getAllEmployees = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM employees ORDER BY name'
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
      'SELECT * FROM employees WHERE id = $1',
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
      data: result.rows[0]
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
    const { name, email, department, position } = req.body;
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }
    
    const result = await pool.query(
      'INSERT INTO employees (name, email, department, position) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, department, position]
    );
    
    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: result.rows[0]
    });
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

// Export these functions so routes can use them
module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee
};