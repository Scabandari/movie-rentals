const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./models/customer');

const customerRoutes = require('./routes/customerRoutes');

app.use('/customers', customerRoutes);
app.get('/', (req, res) => {
   res.send("working");
});




// Other routes must be defined first before error routes
app.get('*', (req, res, next) => {
    const err = new Error('Page not found');
    err.statusCode = 404;
    next(err);
});

const port = 4000;
app.listen(port, () => {
    console.log(`NodeJs server running on port ${port}`);
});