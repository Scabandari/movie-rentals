const express = require('express');
const router = express.Router();
const employee_controller = require('../controllers/employeeController');

router.post('/create', employee_controller.employee_create);
router.get('/', employee_controller.employee_list);
router.get('/:employeeId/detail', employee_controller.employee_detail);

module.exports = router;