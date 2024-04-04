import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import userModel from '../dao/db/models/userModel.js';
import { createHash } from '../utils/bcrypt.js'

const initializatePassport = () => {
    passport.use('register', new LocalStrategy(
        { usernameField: 'email', passReqToCallback: true },
        async (req, username, password, done) => {
            try {
                let userData = req.body;
                let user = await userModel.findOne({ email: username });
                if (user) {
                   return done('User already exist')
                }
                let newUser = {
                    name: userData.name,
                    email: username,
                    password: createHash(username, userData.password),
                }
                let result = await userModel.create(newUser)
                return done(null, result)
            } catch (err) { return done('Error creating user: ' + err) }
        }));

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser((id, done) => {
        let user = userModel.findById(id);
        done(null, user);
    });
}

export default initializatePassport;