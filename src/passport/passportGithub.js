import passport from 'passport';
import github from 'passport-github2';
import userSchema from '../dao/db/models/userModel.js';

const initPassport = () => {
    passport.use("github", new github.Strategy(
        {
            clientID: "Iv1.9966f74512fd1c87",
            clientSecret: "d7ed9f8558da0b239ac21e1876b80921772d5b0d",
            callbackURL: "http://localhost:8080/api/user/callbackGithub"
        },
        async (accesToken, refreshToken, profile, done) => {
            try {
                let { name, email } = profile._json
                let user = await userSchema.findOne({ email })
                if (!user) {
                    user = userSchema.create({
                        name: name,
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

    passport.deserializeUser((id, done) => {
        let user = userModel.findById(id);
        done(null, user);
    });
}

export default initPassport;