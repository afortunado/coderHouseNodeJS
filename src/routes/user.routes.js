import { Router } from "express";
import { getUserById, changeUserRole } from "../controllers/userControllers.js";
const routerUser = Router();

routerUser.get('/:uid', getUserById);
routerUser.get('/premium/:uid', changeUserRole);


export default routerUser;