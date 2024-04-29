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
    let idCart = req.params.cid;
    let idProduct = req.params.pid;
    try {
        const updatedCart = await cartService.addProductToCart(idCart, idProduct)
        return res.status(200).json(updatedCart);
    } catch (err) {
        next(err);
    }
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

export const deleteAllProducts = async(req,res,next) => {
    let cartId = req.params.cid;
     try {
        const newCart = await cartService.deleteAllProducts(cartId);
        await newCart.save();
        return res.status(200).json(newCart);
    }catch(err){ next(err);}
}

export const createTicket = async(req, res, next) => {
    const cartId = req.params.cid;
    try {
        const cart = await cartService.getCartById(cartId);
        const ticket = await cartService.createTicket(cart);
        return res.status(200).json(ticket)
    } catch(error){
        next(error)
    }
}