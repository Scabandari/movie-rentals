const express = require('express');
const Customer = require('../models/customer');
const router = express.Router();
const customer_controller = require('../controllers/customerController');
//require('mongoose');

// GET list of all Customers
router.get('/', customer_controller.customer_list);

// GET details of one customer by their _id
router.get('/:customerId', customer_controller.customer_detail);

// POST create a new Customer instance
router.post('/create', customer_controller.customer_create);

// DELETE a Customer instance by _id
router.delete('/:customerId/delete', customer_controller.customer_delete);

router.put('/:customerId/update', customer_controller.customer_update);

router.patch('/:customerId/patch', customer_controller.customer_patch);

module.exports = router;