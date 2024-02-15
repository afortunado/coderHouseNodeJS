import { Router } from "express";
//import ProductManager from '../dao/productManager.js';
import Product from '../dao/models/product.model.js'
//const product = new ProductManager('productFile.json');
const routerProd = Router();

routerProd.get('/', async (req, res) => {

    try {
        let resp = await Product.find()
        res.status(200).json({
            msg: 'Productos encontrados',
            Data: resp
        })
        /*let allProducts = await product.getProducts();
        let limit = req.query.limit;
        if (limit && !isNaN(limit)) { allProducts = allProducts.slice(0, limit); }
        res.status(200).json(allProducts);*/
    } catch (err) { res.status(404).json(`Error retrieving products: ${err.message}`) }
})

routerProd.get('/:pid', async (req, res) => {
    try {
        let productId = req.params.pid;
        let productById = await product.getProductById(productId);
        res.status(200).json(productById);
    } catch (err) { res.status(404).json(`Error retrieving product: ${err.message}`) }
})

routerProd.post('/', async (req, res) => {
    await product.addProduct(req.body)
    try {
        res.status(200).json("Product added successfully");
    } catch (err) { res.status(404).json(`Something went wrong: ${err.message}`) }
})

routerProd.put('/:pid', async (req, res) => {
    try {
        const idProduct = req.params.pid;
        await product.updateProducts(idProduct, req.body);
        res.status(200).json("Product updated successfully");
    } catch (err) { res.status(404).json(`Couldn't update product: ${err.message}`); }
})

routerProd.delete('/:pid', async (req, res) => {
    try {
        const idProduct = req.params.pid;
        await product.deleteProducts(idProduct);
        res.status(200).json("Product deleted successfully")
    } catch (err) { res.status(404).json(`Couldn't delete product: ${err.message}`) }
})

export default routerProd;