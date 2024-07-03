import { Router } from "express";
//import ProductManager from '../dao/fileSystem/productManager.js';
//const product = new ProductManager('productFile.json');
import { getProduct, getProductById, addProduct, updateProduct, deleteProduct } from '../controllers/productControllers.js';
import { checkRole } from "../config/authMiddleware.js";

const routerProd = Router();

routerProd.get("/", getProduct);

routerProd.get('/:pid', getProductById);

routerProd.post('/', checkRole(['admin', 'premium']), addProduct);

routerProd.put('/:pid', checkRole(['admin']), updateProduct);

routerProd.delete('/:pid', checkRole(['admin']), deleteProduct);

export default routerProd;