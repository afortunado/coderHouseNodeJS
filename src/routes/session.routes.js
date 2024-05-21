import { Router } from "express";
import { createSession,logoutUser} from "../controllers/sessionControllers.js";
import passport from "passport";
const routerSessions = Router();

routerSessions.post('/register', passport.authenticate('register', {}));

routerSessions.post("/login", passport.authenticate('login', {}), createSession);

routerSessions.get('/login/github', passport.authenticate('github', {}));
routerSessions.get('/callbackGithub', passport.authenticate('github', {}), createSession);

routerSessions.post("/logout", logoutUser)

export default routerSessions