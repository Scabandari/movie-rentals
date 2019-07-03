const Employee = require('../models/employee');

exports.employee_create = (req, res) => {
    //console.log(`req.query: ${req.query}`);
    const employee = new Employee(req.query);
    employee.save().then(emp => {
        res.status(200).json(emp);
    }).catch(err => {
        res.status(400).json({
            "Error msg": `Could not create model instance. Bad query: ${JSON.stringify(req.query)}`,
            "err": err
        });
    });
};

exports.employee_detail = (req, res) => {
  const { employeeId } = req.params;
  Employee.findById(employeeId).then(emp => {
    res.status(200).json(emp);
  }).catch(err => {
      res.status(406).json({
          "Error msg": `No employee found with id: ${movieId}`,
          "err": err
      });
  });
};

exports.employee_list = (req, res) => {
  Employee.find({}).then(employees => {
      res.status(200).send(employees);
  }).catch(err => {
      res.status(406).json({
          "Error msg": "No employees found",
          "err": err
      });
  });
};
