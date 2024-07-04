import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();

const user = process.dotenv.USER_NODEMAILER;
const pass = process.dotenv.PASS_NODEMAILER;

export const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
              user: user,
              pass: pass,
            },
        });