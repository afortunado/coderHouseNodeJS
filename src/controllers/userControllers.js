 import userService from "../dao/db/managers/userManagerMongo.js";

export const getUserById = async(req, res, next) => {
    const userId = req.params.uid;
    try {
        let user = await userService.getUserById(userId)
        res.status(200).json(user);
    } catch(err){ next(err); }
}

export const logoutUser = async(req, res, next) => {
    try{
        req.session.destroy()
        res.status(200).json("Session destroyed")
    } catch(err){
        next(err);
    }
}