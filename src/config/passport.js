import passport from 'passport';
import github from 'passport-github2';
import { Strategy as LocalStrategy } from 'passport-local';
import userService from '../dao/db/managers/userManagerMongo.js';
import { correctPassword } from '../utils/bcrypt.js';


const initializatePassport = () =>{
    passport.use('register', new LocalStrategy(
        { usernameField: 'email', passReqToCallback: true },
        async (req, email, password, done) => {
            console.log("U: ",email, "P: ",password)
            try {
                // verificar si llega email y password
                let user = await userService.getUserByEmail(email)
                if(!user){
                    user = await userService.addUser(email, password)
                    return done(null, user);
                }else{throw new Error("User already exists")}
            } catch (err) { return done(err) }
        }));
    
    passport.use("github", new github.Strategy(
            {
                clientID: "Iv1.9966f74512fd1c87",
                clientSecret: "d7ed9f8558da0b239ac21e1876b80921772d5b0d",
                callbackURL: "http://localhost:8080/api/sessions/callbackGithub"
            },
            async (accesToken, refreshToken, profile, done) => {
                try {
                    console.log(profile)
                    /*const { email } = profile._json
                    let user = await userModel.findOne({ email })
                    if (!user) {
                        user = userModel.create({
                            email,
                            github: profile
                        })
                    }
                    return done(null, user);*/
                } catch (err) { return done(err); }
        }))

    passport.use('login', new LocalStrategy(
        { usernameField: 'email', passReqToCallback: true },
        async (req, email, password, done) => {
            try {
            //verificar si el mail y password llegan
                let userExist = await userService.getUserByEmail(email)
                if(!userExist || !await correctPassword(password, userExist.password)){
                    throw new Error("User and password doesn't match")
                }else {return done(null, userExist);}
            } catch (err) { return done(err) }
        }));

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (id, done) => {
        try{
            let user = await userService.getUserById(id);
            done(null, user);
        } catch(err){
            done(err);
        };

    });
};

export default initializatePassport;