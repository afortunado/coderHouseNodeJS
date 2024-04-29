  import passport from 'passport';
import github from 'passport-github2';
import { Strategy as LocalStrategy } from 'passport-local';
import userModel from '../dao/db/models/userModel.js';
import { createHash } from '../utils/bcrypt.js'
 
const initializatePassport = () =>{
    passport.use('register', new LocalStrategy(
        { usernameField: 'email', passReqToCallback: true },
        async (req, username, password, done) => {
            try {
                let userData = req.body;
                let user = await userModel.findOne({ email: username });
                if (user) {
                   return done(new Error('User already exist'))
                }
                let hashedPassword = await createHash(userData.password)
                let newUser = userModel.create({
                    name: userData.name,
                    email: username,
                    password: hashedPassword,
                })
                return done(null, newUser);
            } catch (err) { return done(err) }
        }));

        passport.use("github", new github.Strategy(
            {
                clientID: "Iv1.9966f74512fd1c87",
                clientSecret: "d7ed9f8558da0b239ac21e1876b80921772d5b0d",
                callbackURL: "http://localhost:8080/api/user/callbackGithub"
            },
            async (accesToken, refreshToken, profile, done) => {
                try {
                    const { name, email } = profile._json
                    let user = await userModel.findOne({ email })
                    if (!user) {
                        user = userModel.create({
                            name,
                            email,
                            github: profile
                        })
                    }
                    return done(null, user);
                } catch (err) {
                    return done(err);
                }
            }
        ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (id, done) => {
        try{
            let user = await userModel.findById(id);
            done(null, user);
        } catch(err){
            done(err);
        };

    });
};

export default initializatePassport;