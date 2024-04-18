import { getProduct } from "../controllers/productControllers.js";
import { renderProducts } from "../controllers/viewsControllers.js";

export const getProductAndRender = async(req, res, next) => {
    try{
        const products = await getProduct(req, res, next);
        await renderProducts(req, res, next, products);
        return products;
    }catch(err){
        next(err);
    };
};