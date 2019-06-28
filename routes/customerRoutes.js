const express = require('express');
const Customer = require('../models/customer');
const router = express.Router();
require('mongoose');


router.get('/', async (req, res) => {
    const customers = await Customer.find({});
    //console.log(customers);
    if(customers) {
        res.status(200).send(customers);
    } else {
        res.status(404).send({"Error msg": "No customers found"});
    }
    //res.json("working");
});

router.get('/:customerId', async (req, res) => {
    const { customerId } = req.params;
    const customer = await Customer.findById(customerId);
    if(customer) {
        res.status(200).send(customer);
    } else {
        res.status(404).send({"Error msg": `No Customer instances found with id: ${customerId}`});
    }
});

router.post('/', async (req, res) => {
    // console.log(`req.body: ${JSON.stringify(req.body)}`);
    // console.log(`req.query: ${JSON.stringify(req.query)}`);

    try {
        //const { first_name, last_name, phone, email } = req.body
        const customer = new Customer(req.query);
        await customer.save();
        res.status(200).send(customer);
    } catch(err) {
        res.status(400).send({"Error msg": "Could not create Customer instance"})
    }
});


module.exports = router;