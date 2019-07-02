const Customer = require('../models/customer');

exports.customer_list = async (req, res) => {
    const customers = await Customer.find({});
    //console.log(customers);
    if(customers.length > 0) {
        res.status(200).json(customers);
    } else {
        res.status(404).json({"Error msg": "No customers found"});
    }
    //res.json("working");
};

exports.customer_create = async (req, res) => {
    // console.log(`req.body: ${JSON.stringify(req.body)}`);
    // console.log(`req.query: ${JSON.stringify(req.query)}`);

    try {
        //const { first_name, last_name, phone, email } = req.query
        const customer = new Customer(req.query);
        await customer.save();
        res.status(200).json(customer);
    } catch(err) {
        //console.log(`err POST for customers: ${err}`);
        res.status(400).json({"Error msg": "Could not create Customer instance"})
    }
};

exports.customer_delete = async (req, res) => {
    const { customerId } = req.params;
    try {
        //const customer = await Customer.findByIdAndRemove(customerId);
        await Customer.findByIdAndRemove(customerId);
        res.status(200).json({"Success msg" : "Successfully deleted Customer instance"});
    } catch(err) {
        res.status(400).json(
            {"Error msg" : `Could not delete Customer instance with id: ${customerId}`});
    }
};

exports.customer_detail = async (req, res) => {
    const { customerId } = req.params;
    try {
        const customer = await Customer.findById(customerId);
        if(customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({"Error msg": `No Customer instances found with id: ${customerId}`});
        }
    } catch(err) {
        res.status(400).json({"Error msg": "Not a valid Customer id"});
    }
};

exports.customer_update = async (req, res) => {
    const { customerId } = req.params;
    try {
        const customer = await Customer.findById(customerId);
        if(customer) {
            //console.log('customer = true');
            const {          // start_date is absent and shouldn't be changed
                first_name,
                last_name,
                email,
                phone,
                account_active,
                balance,
                end_date
            } = req.query;

            customer.first_name = first_name || customer.first_name;
            customer.last_name = last_name || customer.last_name;
            customer.email = email || customer.email;
            customer.phone = phone || customer.phone;
            customer.balance = balance || customer.balance;
            customer.account_active = account_active || customer.account_active;
            customer.end_date = end_date || customer.end_date;

            await customer.save();
            res.send(customer);
        } else {
            res.status(404).json({"Error msg" : `Could not find Customer to update with id: ${customerId}`});
        }
    } catch(err) {
        res.status(400).json({"Error msg": "Not a valid Customer id"});
    }

};

exports.customer_patch = async (req, res) => {
    const { customerId } = req.params;
    // TODO would this code or my other controllers look cleaner using promises instead of async await
    // TODO maybe a combo of both
    try {
        //console.log(`req.query: ${JSON.stringify(req.query)}`);
        const customer = await Customer.findById(customerId);
        customer.addToBalance(req.query.amount);
        //await customer.save()

        res.status(200).json(customer);
    } catch(err) {
        res.status(500).json({
            "Error msg": `Could not patch Customer instance with id ${customerId}`,
            "err": err});
    }
};