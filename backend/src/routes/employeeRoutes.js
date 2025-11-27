const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee
} = require('../controllers/employeeController');

router.get('/', getAllEmployees);          
router.get('/:id', getEmployeeById);        
router.post('/', createEmployee);           
module.exports = router;