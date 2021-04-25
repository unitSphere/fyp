const express = require('express');
const router = express.Router();
const passport = require('passport');
const ProfileCtrl = require('../../controllers/profileCtrl');

router.get('/current', passport.authenticate('jwt', { session: false }), ProfileCtrl.getProfile);
router.post('/create', passport.authenticate('jwt', { session: false }), ProfileCtrl.createProfile);
router.get('/user/:id', ProfileCtrl.getProfileById);

module.exports = router;