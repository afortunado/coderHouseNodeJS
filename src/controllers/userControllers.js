 import userService from "../dao/db/managers/userManagerMongo.js";
 import { createHash, correctPassword } from "../utils/bcrypt.js";

 export const addUser = async(req, res, next) => {
    const newUser = req.body; 
    let hashedPassword = await createHash(newUser.password)
    try {
        let userFounded = await userService.getUserByEmail(newUser.email)
        if(!userFounded){
            let userCreated = await userService.addUser(newUser.email, hashedPassword)
            res.status(200).json(userCreated);
        } else { res.status(400).json("User already exist") }
    } catch(err){ next(err) };
};

export const getUserById = async(req, res, next) => {
    const userId = req.params.uid;
    try {
        let user = await userService.getUserById(userId)
        res.status(200).json(user);
    } catch(err){ next(err); }
}

export const loginUser = async(req, res, next) => {
    let {userEmail, userPassword} = req.body;
    try {
        let userLogged = await userService.getUserByEmail(userEmail)
        if(userLogged){
            if(!correctPassword(userPassword, userLogged.password)){ 
                res.status(400).json("User and password doesn't match")
            }
            return res.redirect("/products");
        }
    }catch(err){ next(err) }
}

export const createSession = async(req, res, next) => {
    try{
        req.session.user = req.user;
    return res.status(200).json(req.user);
    }catch(err){
        next(err);
    }
}
