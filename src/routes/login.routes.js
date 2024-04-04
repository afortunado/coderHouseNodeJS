import { Router } from "express";
import { correctPassword } from "../utils/bcrypt.js"
const routerlogin = Router();

routerlogin.post('/login', (req, res) => {
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

routerlogin.post('/logout', (req, res) => {

})

export default routerlogin;