import express from 'express';
import session from 'express-session'
import { engine } from 'express-handlebars'
import __dirname from './views/dirname.js';
import http from "http";
import { Server as ServerSocket } from "socket.io";
import Database from './dao/db/index.js'
import initializatePassport from './passport/passport.js'
import initPassport from './passport/passportGithub.js';
import passport from 'passport';
import MongoStore from 'connect-mongo'; 
import cookieParser from 'cookie-parser';
import routerIndex from "./routes/index.routes.js"


const app = express();
const PORT = 8080 || process.env.PORT;
const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));

app.use(session({
    store: MongoStore.create({ mongoUrl: "mongodb+srv://luchomartinetti93:fortuna.3000@coderhouseproject.94gq4nr.mongodb.net/ecommerce" }),
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true
}))

app.use(cookieParser())

initializatePassport();
initPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname);

app.use(express.json());

app.use(routerIndex)

const io = new ServerSocket(server);

server.listen(PORT, () => {
    console.log("Server running on port", PORT)
    Database.connect();
});

export default io;


