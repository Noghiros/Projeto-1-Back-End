const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false //Opcional
    },
    password: {
        type: String,
        required: true
    },
    is_online: {
        type: Boolean,
        required: false
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); // Exportando o modelo