const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentProfileSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    studentID: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    createDate:{
        type: Date,
        default: Date.now
    }
});

module.exports = StudentProfile = mongoose.model('studentProfile', StudentProfileSchema);