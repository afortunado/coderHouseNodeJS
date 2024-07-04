import express from 'express';
import session from 'express-session'
import { engine } from 'express-handlebars'
import __dirname from './dirname.js';
import http from "http";
import { Server as ServerSocket } from "socket.io";
import Database from './dao/db/index.js'
import initializatePassport from './config/passport.js'
import passport from 'passport';
import MongoStore from 'connect-mongo';
import routerIndex from "./routes/index.routes.js"
import dotenv from 'dotenv'
import compression from 'express-compression';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 9090;
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    secret: "secretCoder",
    resave: false,
    saveUninitialized: false
}))

initializatePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname+"/public"));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+"/views");

app.use(routerIndex)

app.use(compression())

const io = new ServerSocket(server);

server.listen(PORT, () => {
    console.log("Server running on port", PORT)
    Database.connect();
});

export default io;

