import { Router } from "express";
//import ProductManager from '../dao/fileSystem/productManager.js';
//const product = new ProductManager('productFile.json');
import ProductManagerMongo from "../dao/db/controllers/productManagerMongo.js";
const routerProd = Router();
const productManager = new ProductManagerMongo();


routerProd.get("/", productManager.getProduct);

routerProd.get('/:pid', productManager.getProductById);

routerProd.post('/', productManager.addProduct);

routerProd.put('/:pid', productManager.updateProduct);

routerProd.delete('/:pid', productManager.deleteProduct);

export default routerProd;