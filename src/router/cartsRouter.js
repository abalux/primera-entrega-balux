import { Router } from "express";
import { manager } from "../services/cartsManager.js";

export const cartsRouter = Router();

cartsRouter.post('/', async (req, res) => {
    const createdCart = await manager.createCart();
    if (createdCart){
        res.json({Created: createdCart})
    }else{
        res.json({error: "The cart can't be created"})
    }
})

cartsRouter.get('/:cid', async (req, res) => {
    const cartId = parseInt(req.params['cid']);
    const cartFound = await manager.getCartById(cartId);
    if (cartFound){
        res.json({Cart: cartFound})
    }else{
        res.json({error : "There isn't a cart with that id"})
    }
})

cartsRouter.post('/:cid/products/:pid', async (req, res) =>{
    const productId = parseInt(req.params['pid']);
    const cartId = parseInt(req.params['cid']);
    const addedProductsInCart = await manager.addProductsInCart(productId, cartId);
    if (addedProductsInCart){
        res.json({Cart : addedProductsInCart})
    }else{
        res.json({error: "Products can't be added in that cart"})
    }
})