 import User from "../models/userModel.js"

 class UserManagerMongo {

    static async addUser(req, res, next) {
        const newUser = req.body;
        try {
            let userCreated = User.create(newUser);
            return res.status(200).json(userCreated);
        } catch(err){ next(err) };
    };

    static async getUserById(req, res, next) {
        const userId = req.params.uid;
        try {
            let user = User.findOne({ _id: userId });
            return res.status(200).json(user);
        } catch(err){ next(err); }
    };

 };

 export default UserManagerMongo;

