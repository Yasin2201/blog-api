const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');

// Handle User Sign-up
exports.sign_up_post = [

    //validate and sanitize sign-up fields
    body('username', 'Invalid Username').trim().isLength({ min: 1 }).escape(),
    body('password', 'Invalid Password').trim().isLength({ min: 1 }).escape(),

    (req, res, next) => {

        //Errors from req if any
        const errors = validationResult(req)

        //hash users inputted password with bcrypt for security
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) { return next(err) }

            //Create new user with validated data and hashed password
            const user = new User({
                username: req.body.username,
                password: hashedPassword,
            });

            if (!errors.isEmpty()) {
                res.json({ title: 'Sign Up', errors: errors.array(), user: undefined });
                return
            } else {
                // first check if username already exists
                User.findOne({ 'username': req.body.username })
                    .exec(function (err, found_username) {
                        if (err) { return next(err) }

                        // if username exists re-render sign-up with error
                        if (found_username) {
                            res.json({ title: 'Sign Up', user: undefined, errors: [{ msg: 'Username already exists' }] });
                        } else {
                            user.save(function (err) {
                                if (err) { return next(err) }
                                res.json({ message: 'Signed Up Successfully!' })
                            });
                        }
                    });
            }
        });
    }
];