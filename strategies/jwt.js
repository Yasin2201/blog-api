require('dotenv').config();

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY

module.exports = new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({ username: jwt_payload.username }, (err, user) => {
        if (err) {
            console.log(err);
        }
        if (user) {
            return done(null, true);
        }
        return done(null, false);
    });
});