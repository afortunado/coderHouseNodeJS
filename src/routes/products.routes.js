import { Router } from "express";
//import ProductManager from '../dao/fileSystem/productManager.js';
//const product = new ProductManager('productFile.json');
import { getProduct, getProductById, addProduct, updateProduct, deleteProduct } from '../controllers/productControllers.js';
const routerProd = Router();

routerProd.get("/", getProduct);

routerProd.get('/:pid', getProductById);

routerProd.post('/', addProduct);

routerProd.put('/:pid', updateProduct);

routerProd.delete('/:pid', deleteProduct);

export default routerProd;