const Event = require('../models/Event');

createComment = (req, res) => {
    Event.findById(req.params.id)
        .then(event => {

            const comment = {
                comment: req.body.comment,
                user: req.user.id,
                name: req.user.name
            };

            event.comments.unshift(comment);

            event.save()
                .then(event => {
                    return res.json(event);
                });
        }).catch(err => console.log(err));
}


deleteComment = (req, res) => {
    Event.findById(req.params.id)
        .then(event => {
            const idx = event.comments
                .map(comment => comment.id)
                .indexOf(req.params.cid);

            if (event.comments[idx].user.toString() !== req.user.id) {
                return res.status(401).json({ error: 'You are not authorized' });
            }
            event.comments.splice(idx, 1);

            event.save()
                .then(event => res.json(event));
        }).catch(err => console.log(err));
}

module.exports = {
    createComment,
    deleteComment
}