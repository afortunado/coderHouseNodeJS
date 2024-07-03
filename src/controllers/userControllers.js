import userService from "../dao/db/managers/userManagerMongo.js";

export const getUserById = async(req, res, next) => {
    const userId = req.params.uid;
    try {
        let user = await userService.getUserById(userId)
        res.status(200).json(user._id);
    } catch(err){ next(err); }
}

export const changeUserRole = async(req, res, next) => {
    const userId = req.params.uid;
    try{
        let user = await userService.getUserById(userId);
        if(user.role === "user"){
            user.role = "premium"
        } else { user.role = "user"}
    } catch(err) {
        next(err)
    }
}