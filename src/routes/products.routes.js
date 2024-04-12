import { Router } from "express";
//import ProductManager from '../dao/fileSystem/productManager.js';
//const product = new ProductManager('productFile.json');
import ProductManagerMongo from "../dao/db/controllers/productManagerMongo.js";
const routerProd = Router();
const { getProduct, getProductById, addProduct, updateProduct, deleteProduct } = ProductManagerMongo;

routerProd.get("/", getProduct);

routerProd.get('/:pid', getProductById);

routerProd.post('/', addProduct);

routerProd.put('/:pid', updateProduct);

routerProd.delete('/:pid', deleteProduct);

export default routerProd;