import User from "../models/userModel.js"
import { createHash } from "../../../utils/bcrypt.js";

const userService = {};
 
userService.addUser = async(email, pass) => {
    let hashedPassword = await createHash(pass)
   const newUser = { email, password: hashedPassword }
   return await User.create(newUser);
}

userService.getUserById = async(userId) => {
    return await User.findOne({ _id: userId });
    };

userService.getUserByEmail = async(userEmail) => {
    return await User.findOne({ email: userEmail})
}

export default userService;

