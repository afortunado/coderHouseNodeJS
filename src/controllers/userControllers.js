 import userService from "../dao/db/managers/userManagerMongo.js";
 import { correctPassword } from "../utils/bcrypt.js";

 export const addUser = async(req, res, next) => {
    const newUser = req.body;
    try {
        let userCreated = await userService.addUser(newUser)
        res.status(200).json(userCreated);
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
    const userLogin = req.body;
    try {
        let userLogged = await userService.getUserByEmail(userLogin.email)
        if(userLogged){
            if(!correctPassword(userLogin, userLogged.password)){ 
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