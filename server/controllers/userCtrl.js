const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');
const Order = require('../models/Order');
const nodemailer = require('nodemailer');
const smtpTransporter=require('nodemailer-smtp-transport');
const crypto = require('crypto');




createStudent = (req, res) => {
    const errors = {};

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.message = 'Email already exists';
                return res.status(400).json(errors);
            }
            else {
                const user = new User({
                    name: req.body.name,
                    role: req.body.role,
                    email: req.body.email,
                    password: req.body.password,
                    
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        user
                            .save()
                            .then(user => {
                                res.json({
                                    success: true,
                                    message: "User successfully created"
                                });
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
}


createAdmin = (req, res) => {
    if (req.user.role === 'admin') {
        const errors = {};
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    errors.message = 'Email already exists';
                    return res.status(400).json(errors);
                }
                else {
                    const user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        role: 'admin'
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(user.password, salt, (err, hash) => {
                            if (err) throw err;
                            user.password = hash;
                            user
                                .save()
                                .then(() => {
                                    res.json({
                                        success: true,
                                        message: "User successfully created"
                                    });
                                })
                                .catch(err => console.log(err));
                        });
                    });
                }
            });
    }

    else {
        return res.status(401).json({
            success: false, 
            message: 'You are not authorized' });
    }

}


login = (req, res) => {
    const errors = {};


    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                errors.message = 'Incorrect email or password';
                return res.status(404).json(errors);
            }
            bcrypt.compare(req.body.password, user.password)
                .then(areSame => {
                    if (areSame) {
                        const payload = { id: user.id };

                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    name: user.name,
                                    role: user.role,
                                    token: 'Bearer ' + token
                                });
                            });
                    }
                    else {
                        errors.message = 'Incorrect email or password';
                        return res.status(400).json(errors);
                    }
                });
        });
}


getCurrentUser = (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        role: req.user.role,
        email: req.user.email
    });
}


getUserOrders = async (req, res) => {
    var myOrders = [];
    await Order.find().sort('-createdAt').then(orders => {
        orders.forEach(order => {
                if (order.orderMadeBy === req.user.name) {
                    myOrders.push(order);
                }
        });
    });
    if(myOrders.length) return res.json(myOrders);
    return res.json({
        success: false,
        message: 'No orders found'
    });
}


getUserById = (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json({
            id: user.id,
            name: user.name,
            role: user.role,
            email: user.email
        }))
        .catch(err => console.log(err));
}

getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}


module.exports = {
    createStudent,
    createAdmin,
    login,
    // confirmEmail,
    getCurrentUser,
    getUserOrders,
    getUserById,
    getUsers
}