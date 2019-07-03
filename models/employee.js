const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    start_date: {  // date customer signed up
        type: Date,
        default: Date.now()
    },
    hourly_rate: {
        type: Number,
        default: 17
    },
    full_time: {
        type: Boolean,
        default: true
    },
    end_date: Date
});



module.exports = mongoose.model('Employee', employeeSchema);