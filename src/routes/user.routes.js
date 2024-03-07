import { Router } from "express";
import correctPassword from "../utils/bcrypt"
import passport from "passport";
const routerUser = Router();

let users = [];

routerUser.post('/register', passport.authenticate('register', { failureRedirect: '/user/failedRegister' }), (req, res) => {
    res.status(200).json("User registered")
})

routerUser.get('/failedRegister', (req, res) => {
    res.status(404).json("User failed to register")
})

routerUser.post('/login', (req, res) => {
    let userNew = req.body;
    let userFound = userNew.find(u => { return u.email == userNew.email })

    if (userFound) {
        if (!correctPassword(userFound, userNew.password)) { res.status(400).json("Wrong user or password") }
        res.status(200).json("User loged")
    }
    res.status(400).json("User not founded")
})

routerUser.post('/logout', (req, res) => {

})

export default routerUser;