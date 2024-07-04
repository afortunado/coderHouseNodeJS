import { Router } from "express";
import userService from "../dao/db/managers/userManagerMongo.js";
import { createHash } from "../utils/bcrypt.js";
import { transporter } from "../config/nodeMailer.js";
import dotenv from 'dotenv';
dotenv.config()
const mainEmail = process.env.USER_NODEMAILER

const routerMailer = Router();

routerMailer.post('/newpass', async (req, res) => {
    let { userEmail, newPass } = req.body
})

routerMailer.post('/', async (req, res) =>{
    let msg = transporter.sendMail({
        from: mainEmail,
        to: req.email,
        subject: "Get your password back",
        html:<button>Restore password</button>
    })
})

export default routerMailer;