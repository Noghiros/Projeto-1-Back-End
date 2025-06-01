const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: Boolean,
        required: true
    },
    email: {
        type: Boolean,
        required: true
    },
    image: {
        type: Boolean,
        required: true
    },
    password: {
        type: Boolean,
        required: true
    },
    is_online: {
        type: Boolean,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); // Exportando o modelo