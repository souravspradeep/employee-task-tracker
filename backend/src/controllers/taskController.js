const pool = require('../config/database');

const getAllTasks = async (req, res) => {
  try {
    const { status, employee_id } = req.query; 
    
    let query = `
      SELECT 
        tasks.*,
        employees.name as employee_name,
        employees.email as employee_email
      FROM tasks
      LEFT JOIN employees ON tasks.employee_id = employees.id
    `;
    
    const conditions = [];
    const values = [];
    
    if (status) {
      conditions.push(`tasks.status = $${conditions.length + 1}`);
      values.push(status);
    }
    
    if (employee_id) {
      conditions.push(`tasks.employee_id = $${conditions.length + 1}`);
      values.push(employee_id);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY tasks.created_at DESC';
    
    const result = await pool.query(query, values);
    
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get tasks'
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      `SELECT 
        tasks.*,
        employees.name as employee_name
      FROM tasks
      LEFT JOIN employees ON tasks.employee_id = employees.id
      WHERE tasks.id = $1`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error getting task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get task'
    });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, employee_id, due_date } = req.body;
    
    if (!title || !employee_id) {
      return res.status(400).json({
        success: false,
        message: 'Title and employee are required'
      });
    }
    
    const result = await pool.query(
      `INSERT INTO tasks (title, description, status, priority, employee_id, due_date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, description, status || 'pending', priority || 'medium', employee_id, due_date]
    );
    
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create task'
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, employee_id, due_date } = req.body;
    
    const result = await pool.query(
      `UPDATE tasks
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           status = COALESCE($3, status),
           priority = COALESCE($4, priority),
           employee_id = COALESCE($5, employee_id),
           due_date = COALESCE($6, due_date),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [title, description, status, priority, employee_id, due_date, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Task updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update task'
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete task'
    });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};