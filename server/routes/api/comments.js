const express = require('express');
const router = express.Router();
const passport = require('passport');

const CommentCtrl = require('../../controllers/commentCtrl');

router.post('/:id/comments/', passport.authenticate('jwt', { session: false }), CommentCtrl.createComment);
router.delete('/:id/comments/:cid/', passport.authenticate('jwt', { session: false }), CommentCtrl.deleteComment);

module.exports = router;