import { Router } from "express";
import { getUserById, addUser, loginUser, createSession } from "../controllers/userControllers.js";
import passport from 'passport'
const routerUser = Router();

routerUser.get('/:uid', getUserById);

routerUser.post('/register', passport.authenticate('register', { }));

routerUser.post('/register/github', passport.authenticate('github', { }));
routerUser.get('/callbackGithub', passport.authenticate('github', { }), createSession);

routerUser.post("/login", loginUser)

export default routerUser;