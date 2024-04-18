import cartService from '../dao/db/managers/cartManagerMongo.js'

export const getCart = async(req, res, next) => {
    try {
        const theCart = await cartService.getCart()
        return res.status(200).json(theCart);
    } catch (err) {
        next(err);
    } 
}

export const getCartById = async(req, res, next) => {
    const cartId = req.params.cid;
    try {
        const findCart = await cartService.getCartById(cartId);
        return res.status(200).json(findCart);
    } catch (err) {
        next(err);
    }
}

export const addProductToCart = async(req, res, next) =>{
    let cartId = req.params.cid;
    let productId = req.params.pid;

    try {
        const currentCart = await cartService.getCartById(cartId);
        currentCart.products.push({ product: productId });
    
        await currentCart.save();

        return res.status(200).json(currentCart);
    } catch (err) {
        next(err);
    }
} 

export const updateCart = async(req, res, next) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    const quantity = req.body;
try {
    const currentCart = await cartService.getCartById(idCart)
    let existingProduct = currentCart.products.find(e => e.product.equals(idProduct));
    existingProduct.quantity += quantity.quantity;

    await currentCart.save();

    return res.status(200).json(currentCart);
    } catch (err) { next(err) }
}

export const deleteCartProduct = async(req, res, next) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    try {
        const newCart = await cartService.deleteCartProduct(cartId, productId);
        await newCart.save();

        return res.status(200).json(newCart);

    } catch (err) {
        next(err);
    }
}