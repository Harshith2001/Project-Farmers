import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import credentialModel from '../models/credentialModel.js';
import passport from "passport";
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
const myPassport= passport.use(new Strategy(opts, function(jwt_payload, done) {
    credentialModel.findOne({id: jwt_payload.id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            myPassport.id = jwt_payload.userId;
            return done(null, user);
        } else {
            return done(null, false);
            
        }
    });
}));

export default myPassport;