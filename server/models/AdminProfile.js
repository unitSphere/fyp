const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminProfileSchema = new Schema({
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    bio: {
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = AdminProfile = mongoose.model('adminProfile', AdminProfileSchema);