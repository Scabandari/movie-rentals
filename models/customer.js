const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,  // todo String is best type here?
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    start_date: {  // date customer signed up
        type: Date,
        required: true,
        default: Date.now()
    },
    account_active: {
        type: Boolean,
        default: true
    },
    end_date: Date
});

module.exports = mongoose.model('Customer', customerSchema);

