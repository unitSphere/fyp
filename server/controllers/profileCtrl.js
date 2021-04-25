const StudentProfile = require('../models/StudentProfile');
const AdminProfile = require('../models/AdminProfile');

getProfile = (req, res) => {
    if (req.user.role === 'student') {
        StudentProfile.findOne({ student: req.user.id })
            .then(profile => {
                if (!profile) {
                    return res.status(404).json({ error: 'There is no profile for this student' });
                }
                res.json(profile);
            })
            .catch(err => res.status(500).json(err));
    }
    else {
        AdminProfile.findOne({ admin: req.user.id })
            .then(profile => {
                if (!profile) {
                    return res.status(404).json({ error: 'There is no profile for this admin' });
                }
                res.json(profile);
            })
            .catch(err => res.status(500).json(err));
    }

}

createProfile = (req, res) => {

    if (req.user.role === 'student') {
        const profileBody = {};
        profileBody.student = req.user.id;

        if (req.body.studentID) profileBody.studentID = req.body.studentID;
        if (req.body.bio) profileBody.bio = req.body.bio;


        StudentProfile.findOne({ student: req.user.id }).then(profile => {
            if (profile) {
                StudentProfile.findOneAndUpdate(
                    { student: req.user.id },
                    { $set: profileBody },
                    { new: true }
                ).then(profile => res.json(profile));
            }
            else {
                StudentProfile.findOne({ studentID: profileBody.studentID }).then(profile => {
                    if (profile) {
                        res.status(400).json({ message: 'That studentID already exists' });
                    }
                    else {
                        new StudentProfile(profileBody).save().then(profile => res.json(profile));
                    }
                });
            }
        });
    }
    else {
        const profileBody = {};
        profileBody.admin = req.user.id;

        if (req.body.bio) profileBody.bio = req.body.bio;


        AdminProfile.findOne({ admin: req.user.id }).then(profile => {
            if (profile) {
                AdminProfile.findOneAndUpdate(
                    { admin: req.user.id },
                    { $set: profileBody },
                    { new: true }
                ).then(profile => res.json(profile));
            }
            else {

                new AdminProfile(profileBody).save().then(profile => res.json(profile));

            }
        });
    }

}

getProfileById = (req, res) => {
    const errors = {};

    User.findById(req.params.id)
        .then(user => {
            if (user.role === 'student') {
                StudentProfile.findOne({ student: req.params.id })
                    .then(profile => {
                        if (!profile) {
                            errors.message = 'This user does not exist';
                            res.status(404).json(errors);
                        }
                        res.json(profile);
                    })
                    .catch(err =>
                        res.status(500).json({ errors: err })
                    );
            }
            else if (user.role === 'admin') {

                AdminProfile.findOne({ admin: req.params.id })
                    .then(profile => {
                        if (!profile) {
                            errors.message = 'This user does not exist';
                            res.status(404).json(errors);
                        }
                        res.json(profile);
                    })
                    .catch(err =>
                        res.status(500).json({ errors: err })
                    );
            }

            else {
                return res.status(404).json({ message: 'No such user' });
            }
        })
        .catch(err =>
            res.status(500).json({ error: err })
        );
}

module.exports = {
    getProfile,
    createProfile,
    getProfileById
}