import passport from 'passport';
import github from 'passport-github2';
import { Strategy as LocalStrategy } from 'passport-local';
import { addUser, loginUser } from '../controllers/userControllers.js';
 
const initializatePassport = () =>{
    passport.use('register', new LocalStrategy(
        { usernameField: 'email', passReqToCallback: true },
        async (req, username, password, done) => {
            let userData = req.body;
            try {
                let newUser = await addUser(userData.userEmail, userData.userPassword)
                return done(null, newUser);
            } catch (err) { return done(err) }
        }));

    passport.use('login', new LocalStrategy(
        { usernameField: 'email', passReqToCallback: true },
        async (req, username, password, done) => {
            let userData = req.body;
            try {
                let newUser = await loginUser(userData.userEmail, userData.userPassword)
                return done(null, newUser);
            } catch (err) { return done(err) }
        }));

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

/*passport.use("github", new github.Strategy(
    {
        clientID: "Iv1.9966f74512fd1c87",
        clientSecret: "d7ed9f8558da0b239ac21e1876b80921772d5b0d",
        callbackURL: "http://localhost:8080/api/user/callbackGithub"
    },
    async (accesToken, refreshToken, profile, done) => {
        try {
            const { email } = profile._json
            let user = await userModel.findOne({ email })
            if (!user) {
                user = userModel.create({
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
*/