import User from "../models/userModel.js"

const userService = {};
 
userService.addUser = async(email, pass) => {
   const newUser = { email, password: pass}
   return await User.create(newUser);
}

userService.getUserById = async(userId) => {
    return await User.findOne({ _id: userId });
    };

userService.getUserByEmail = async(userEmail) => {
    return await User.findOne({ email: userEmail})
}

export default userService;

