const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['employee', 'admin']
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
},
    { timestamps: true }
);

module.exports = User = mongoose.model('users', UserSchema);