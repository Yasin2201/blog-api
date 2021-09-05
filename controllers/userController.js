require('dotenv').config()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");

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

//Handle User sign-in 
exports.sign_in_post = [

    //validate and sanitize sign-in fields
    body("username", "Username required").trim().isLength({ min: 1 }).escape(),
    body("password", "Password required").trim().isLength({ min: 1 }).escape(),

    (req, res, next) => {
        let { username, password } = req.body;

        //Errors from req if any
        const errors = validationResult(req)

        User.findOne({ username: username }, (err, user) => {
            if (err) { return next(err) }

            if (!user) { res.status(401).json({ message: "User not found" }); }

            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    // passwords match! log user in
                    const opts = {}
                    opts.expiresIn = 120;  //token expires in 2min
                    const secret = process.env.SECRET_KEY
                    const token = jwt.sign({ username }, secret, opts);
                    return res.status(200).json({
                        message: "Auth Passed",
                        token
                    });
                } else {
                    // passwords do not match!
                    return res.status(401).json({
                        message: "Incorrect Password",
                        errors: errors.array()
                    });
                }
            });
        })
    }
]

//Sign out user
exports.sign_out_get = function (req, res) {
    req.logout();
    res.redirect('/');
};
