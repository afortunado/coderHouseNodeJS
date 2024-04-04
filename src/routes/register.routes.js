import { Router } from "express";
import passport from "passport";
const routerRegister = Router();

routerRegister.post('/register', passport.authenticate('register', { successRedirect: '/user/successRegister', failureRedirect: '/user/failedRegister' }))
routerRegister.get('/successRegister', (req, res) => {
    res.status(200).json("User registered successfully");
}); routerRegister.get('/failedRegister', (req, res) => {
    res.status(404).json("User failed to register")
})

export default routerRegister;