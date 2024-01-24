import express from 'express';
import routerProd from './src/routes/products.routes.js';
import routerCart from './src/routes/cart.routes.js';
const app = express();
const PORT = 8080;

app.use(express.json());
app.use('/api/products', routerProd);
app.use('/api/cart', routerCart)

app.listen(PORT, () => {
    console.log("Server running on port", PORT)
})

