import { Router } from "express";
import passport from "passport";
const routerGithub = Router();

routerGithub.get('/github', passport.authenticate('github'));

routerGithub.get('/callbackGithub', passport.authenticate('github', {
    successRedirect: '/user/login', failureRedirect: '/user/failedGithubLogin'
}))

export default routerGithub;