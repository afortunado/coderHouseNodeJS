export const renderProducts = async(req, res, next, products) => {
    try{
        res.render('products', { products });
    }catch(err){
        next(err);
    };
};