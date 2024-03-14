import { Router } from "express";
import { correctPassword } from "../utils/bcrypt.js"
import passport from "passport";
const routerUser = Router();

routerUser.post('/register', passport.authenticate('register', { successRedirect: '/user/successRegister', failureRedirect: '/user/failedRegister' }))
routerUser.get('/successRegister', (req, res) => {
    res.status(200).json("User registered successfully");
});
routerUser.get('/failedRegister', (req, res) => {
    res.status(404).json("User failed to register")
})

routerUser.get('/github', passport.authenticate('github'));
routerUser.get('/callbackGithub', passport.authenticate('github', {
    successRedirect: '/user/login', failureRedirect: '/user/failedGithubLogin'
}))

routerUser.post('/login', (req, res) => {
    let userNew = req.body;
    let userFound = userNew.find(u => u.email === userNew.email);

    if (userFound) {
        if (!correctPassword(userFound, userNew.password)) {
            return res.status(400).json("Wrong user or password");
        }
        req.session.user = req.user;
        return res.status(200).json("User logged");
    }
    return res.status(400).json("User not found");
})

routerUser.post('/logout', (req, res) => {

})

export default routerUser;