import { Router } from "express";
//import ProductManager from '../dao/productManager.js';
//const product = new ProductManager('productFile.json');
import ProductManagerMongo from '../dao/db/productManagerMongo.js';
const routerProd = Router();
const productManager = new ProductManagerMongo();

routerProd.get('/', async (req, res) => {
    try {
        let limit = req.query.limit || 10;
        let page = req.query.page || 1;
        let query = req.query;
        let sort = req.query.sort;

        let allProducts = await productManager.getProduct(limit, page, query, sort);

        res.status(200).json({
            msg: 'Productos encontrados',
            Data: allProducts
        })
        /*let allProducts = await product.getProducts();
        let limit = req.query.limit;
        if (limit && !isNaN(limit)) { allProducts = allProducts.slice(0, limit); }
        res.status(200).json(allProducts);*/
    } catch (err) { res.status(404).json("Error retrieving products: " + err.message) }
})

routerProd.get('/:pid', async (req, res) => {
    try {
        let productId = req.params.pid;
        let productById = await productManager.getProductById(productId);
        res.status(200).json(productById);
    } catch (err) { res.status(404).json("Error retrieving product") }
})

routerProd.post('/', async (req, res) => {
    try {
        await productManager.addProduct(req.body)
        res.status(200).json("Product added successfully");
    } catch (err) { res.status(404).json(`Something went wrong: ${err.message}`) }
})

routerProd.put('/:pid', async (req, res) => {
    try {
        const idProduct = req.params.pid;
        await productManager.updateProduct(idProduct, req.body);
        res.status(200).json("Product updated successfully");
    } catch (err) { res.status(404).json(`Couldn't update product: ${err.message}`); }
})

routerProd.delete('/:pid', async (req, res) => {
    try {
        const idProduct = req.params.pid;
        await productManager.deleteProduct(idProduct);
        res.status(200).json("Product deleted successfully")
    } catch (err) { res.status(404).json(`Couldn't delete product: ${err.message}`) }
})

export default routerProd;