const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema(
    {
        orderMadeBy: {
            type: String,
            required: true
        },
        price1: {
            type: String,
            required: false,
            default: ""
        },
        orderStatus: {
            type: String,
            required: false,
            default: ""
        },

        price2: {
            type: String,
            required: false,
            default: ""
        },
        submission: {
            type: String,
            required: false,
            default: ""
        },
        vendor1: { 
            type: String, 
            required: true 
        },
        vendor2: { 
            type: String, 
            required: true 
        },
        date: {
            type: String,
            required: true
        },
        category: { 
            type: String, 
            required: true 
        },
        catalog1: { 
            type: String,
            required: true
        },
        catalog2: {
            type: String, 
            required: true 
        },
        description: { 
            type: String, 
            required: true 
        },
        msdFile: {
            type: Boolean,
            required: false
        },
        notes: {
            type: String,
            required: false
        },

        requestDay: {
            type: String,
            required: true,
        },

        receivedDate :{
            type: String,
            required: false
        },

        // daysSinceRequest: {
        //     type: Number,
        //     required: false,
        //     default: ""
        // },

        // completionDays: {
        //     type: Number,
        //     required: false,
        //     default: 14
        // }
        

    },
    { timestamps: true }
)

module.exports = mongoose.model('orders', Order);
