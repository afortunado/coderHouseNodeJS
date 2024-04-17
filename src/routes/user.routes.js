import { Router } from "express";
import UserManagerMongo from "../dao/db/managers/userManagerMongo.js";
const routerUser = Router();
const { getUserById, addUser } = UserManagerMongo;

routerUser.get('/:pid', getUserById);

routerUser.post('/', addUser);

export default routerUser;