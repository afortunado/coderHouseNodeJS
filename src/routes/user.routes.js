import { Router } from "express";
import { getUserById } from "../controllers/userControllers.js";
const routerUser = Router();

routerUser.get('/:uid', getUserById);


export default routerUser;