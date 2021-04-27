// const express = require('express');

// const OrderCtrl = require('../../controllers/orderCtrl');
// const passport = require('passport');
// const router = express.Router();

// router.post('/', passport.authenticate('jwt', { session: false }), OrderCtrl.createOrder);
// router.put('/:id', passport.authenticate('jwt', { session: false }), OrderCtrl.updateOrder);
// router.delete('/:id', passport.authenticate('jwt', { session: false }), OrderCtrl.deleteOrder);
// router.get('/:id', OrderCtrl.getOrderById);
// router.get('/', OrderCtrl.getOrders);

// module.exports = router;
const {
    applyValidationRules,
    validate
} = require('../../validation/inputValidator');
const express = require('express');

const OrderCtrl = require('../../controllers/OrderCtrl');
const passport = require('passport');
const router = express.Router();

router.post('/MakeOrder', OrderCtrl.createOrder);
router.get('/', OrderCtrl.getOrders);
router.get('/allOrders', OrderCtrl.getAllOrders);
router.get('/getSubmissions', OrderCtrl.getSubmissions);
router.get('/getFinishedOrders', OrderCtrl.getFinishedOrders);
router.put('/order/:id', OrderCtrl.updateOrder)
router.delete('/order/:id', OrderCtrl.deleteOrder)
router.get('/order/:id', OrderCtrl.getOrderById)

module.exports = router;