import express from 'express';
import session from 'express-session'
import routerProd from './routes/products.routes.js';
import routerCart from './routes/cart.routes.js';
import routerUser from './routes/user.routes.js';
import handlebars from 'express-handlebars'
import __dirname from './utils/utils.js';
import http from "http";
import { Server } from "socket.io";
import Database from './dao/db/index.js'
import initializatePassport from './passport/passport.js'
import initPassport from './passport/passportGithub.js';
import passport from 'passport';
import MongoStore from 'connect-mongo';

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

initializatePassport();
initPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + "/public"));
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars');

app.use(express.json());
app.use('/api/products', routerProd);
app.use('/api/cart', routerCart);
app.use('/api/user', routerUser);


const io = new Server(server);
io.on('connection', (socket) => {
    console.log("User connected")
})

server.listen(PORT, () => {
    console.log("Server running on port", PORT)
    Database.connect();
});


