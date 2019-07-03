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
    balance: {
        type: Number,
        default: 0
    },
    account_active: {
        type: Boolean,
        default: true
    },
    end_date: Date
});

customerSchema.methods.addToBalance = async function(amount) {
    this.balance  += Number(amount);
    await this.save();
};


// ref: https://mongoosejs.com/docs/guide.html#virtuals
customerSchema.virtual('fullName').get(function() {
    return this.first_name + ' ' + this.last_name;
});

module.exports = mongoose.model('Customer', customerSchema);

