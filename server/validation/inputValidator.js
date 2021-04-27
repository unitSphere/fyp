const { check, validationResult } = require('express-validator');

exports.applyValidationRules = (endpoint) => {
    console.log("endpoint: ", endpoint);
    switch (endpoint) {
        case '/signup': {
            return [
                check('name').isLength({min: 5}).withMessage("The name should be at least five characters long"),
                check('password').isLength({min: 5}).withMessage("Your password should be at least five characters long"),
                check('email').isEmail().withMessage("Please write a valid email")
            ];
        }
        case "/signin": {
            return [
                check('email').isEmail().withMessage("Please write a valid email"),
                check('password').isLength({min: 5}).withMessage("Your password should be at least five characters long"),
            ];
        }
        case "/profile/email": {
            return [
                check('username').isLength({min: 5}).withMessage("Invalid username"),
                check('email').isEmail().withMessage("Invalid Email"),
            ];
        }
        case "/profile/password": {
            return [
                check('username').isLength({min: 5}).withMessage("Invalid username"),
                check('new_password').isLength({min: 5}).withMessage("Your password should be at least five characters long"),
                check('old_password').isLength({min: 5}).withMessage("Your password should be at least five characters long"),

            ];
        }
        case "create order": {
            return [
            ];
        }
        case "create profile": {
            return [
            ];
        }
        case "register": {
            return [
                check('email').isEmail().withMessage("Invalid Email")
            ];
        }
        case "adminRegister": {
            return [
                check('email').isEmail().withMessage("Invalid Email")
            ];
        }
        case "login": {
            return [
                check('email').isEmail().withMessage("Invalid Email")
            ];
        }
    }
};

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    let error = "";
    errors.array().forEach(err => error = error + ". " + err.msg );

    return res.status(422).json({
        error: error,
    });
};