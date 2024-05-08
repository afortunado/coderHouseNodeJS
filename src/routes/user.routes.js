import { Router } from "express";
import { getUserById, logoutUser } from "../controllers/userControllers.js";
import passport from 'passport'
const routerUser = Router();

routerUser.get('/:uid', getUserById);

routerUser.post('/register', passport.authenticate('register', { successRedirect: '/login', failureRedirect: '/register' }));

routerUser.post('/register/github', passport.authenticate('github', {}));
routerUser.get('/callbackGithub', passport.authenticate('github', {}),);

routerUser.post("/login", passport.authenticate('login', {successRedirect: '/products', failureRedirect: '/login'}))

routerUser.post("/logout", logoutUser)

export default routerUser;