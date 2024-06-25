import dotenv from 'dotenv'
import { Command } from 'commander';

const program = new Command();

program
    .option('-d', 'Debug variable', false)
    .option('-p', 'Port', 9090)
    .option('--mode <mode>', 'Working mode', 'develop')
program.parse();

const enviroment = program.opts().mode;

dotenv.config({
    path: enviroment === "production" ? ".src/config/.env.production" : "src/config/.env.development"
});

export default {
    port: process.env.PORT,
    mongoURL: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPass: process.env.ADMIN_PASSWORD,
    enviroment: enviroment
}