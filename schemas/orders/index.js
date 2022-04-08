const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const orderSchema = new mongoose.Schema({
    timestamp: { type: String, require: true },
    email: { type: String, require: true },
    state: { type: String, require: true },
    products: [{
        name: { type: String, require: true },
        quantity: { type: Number, require: true }
    }],
    total: { type: Number, require: true }
});
autoIncrement.initialize(mongoose.connection);
orderSchema.plugin(autoIncrement.plugin, { model: 'orders', field: 'number', startAt: 1 });

module.exports = mongoose.model('orders', orderSchema);