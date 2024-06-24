import { generateProduct } from "../../mocks/product.mock.js";

export const createProducts = async (req, res, next) => {
    try {
        const products = [];
        for (let i = 0; i < 100; i++) {
            products.push(generateProduct());
        }        
        res.status(200).json(products)
    }catch(err){
    next(err)
    }
};