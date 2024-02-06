import express from 'express';
import routerProd from './routes/products.routes.js';
import routerCart from './routes/cart.routes.js';
import routerHome from './routes/home.routes.js';
import handlebars from 'express-handlebars'
import __dirname from './utils.js';
import http from "http";
import { Server } from "socket.io";

const app = express();
const PORT = 8080 || process.env.PORT;
const server = http.createServer(app);

app.use(express.static(__dirname + "/public"));
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', __dirname + "/views");

app.use(express.json());
app.use('/api/products', routerProd);
app.use('/api/cart', routerCart);
app.use('/home', routerHome);

const io = new Server(server);
io.on('connection', (socket) => {
    console.log("User connected")
})

server.listen(PORT, () => {
    console.log("Server running on port", PORT)
});


