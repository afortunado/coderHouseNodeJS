import { Router } from "express";
import UserManagerMongo from "../dao/db/controllers/userManagerMongo.js";
const routerUser = Router();
const userManager = new UserManagerMongo;

routerUser.get('/:pid', userManager.getUserById);

routerUser.post('/', userManager.addUser);

export default routerUser;