const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Event = new Schema(
    {
        host: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        hostName: {
            type: String,
            required: true
        },
        eventName: { 
            type: String, 
            required: true 
        },
        eventType: { 
            type: String, 
            required: true 
        },
        date: {
            type: Date,
            required: true
        },
        quota: { 
            type: Number, 
            required: true 
        },
        participants: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'users'
                },
                name: {
                    type: String,
                    required: true
                }
            } 
        ],
        numOfParticipants: {
            type: Number,
            default: 0
        },
        comments: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'users'
                },
                name: {
                    type: String,
                    required: true
                },
                comment: {
                    type: String,
                    required: true
                },
                date:{
                    type: Date,
                    default: Date.now
                }
            }
        ],
        img: { 
            type: String 
        },
        location: {
            type: String, 
            required: true 
        },
        description: { 
            type: String, 
            required: true 
        },

    },
    { timestamps: true }
)

module.exports = mongoose.model('events', Event);
