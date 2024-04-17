import productService from '../dao/db/managers/productManagerMongo.js';

export const getProduct = async (req, res, next) => {
    try {
        const productos = await productService.getProduct(req.query);
        return res.status(200).json(productos);
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    const productId = req.params.pid;
    try {
        const singleProduct = await productService.getProductById(productId);
        return res.status(200).json(singleProduct);
    } catch (error) {
        next(error);
    }
};

export const addProduct = async (req, res, next) => {
    const newProd = req.body;
    try {
        const productAdded = await productService.addProduct(newProd);
        return res.status(200).json(productAdded);
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    const idProduct = req.params.pid;
    const product = req.body;
    try {
        const productUpdated = await productService.updateProduct(idProduct, product);
        return res.status(200).json(productUpdated);
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    const idProduct = req.params.pid;
    try {
        const deletedProduct = await productService.deleteProduct(idProduct);
        return res.status(200).json(deletedProduct);
    } catch (error) {
        next(error);
    }
};