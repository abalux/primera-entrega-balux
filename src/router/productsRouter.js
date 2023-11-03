import { Router } from "express";
import { manager } from "../services/productManager.js";

export const productsRouter = Router();

productsRouter.get('/:id', async (req, res) => {
    const productId = parseInt(req.params['id'])
    const ProductFound = await manager.getProductById(productId)
    if (ProductFound) {
        res.json({ Product: ProductFound })
    } else {
        res.json({ error: `There isn't a product with id:  ${productId}` })
    }
})


productsRouter.get('/', async (req, res) => {
    const perPage = parseInt(req.query.limit);
    if (perPage) {
        const products = await manager.getProducts()
        const perPageProducts = products.slice(0, perPage)
        res.json({
            Limit: perPage,
            Products : perPageProducts
        })
        } else {
        res.json({
            products: await manager.getProducts()
        })
        }
})

productsRouter.post('/post', async (req, res) => {
    const { title, description, price, thumbnails, code, stock, status, category } = req.body;
    const createdProduct = await manager.addProduct( title, description, price, thumbnails, code, stock, status, category)
    if(createdProduct){
        res.json({Added: createdProduct});
    }else{
        res.json({error:'Product can not be added' })
    }
})  

productsRouter.delete('/delete/:id', async (req, res) =>{
    const productId = parseInt(req.params['id']);
    const deletedProduct = await manager.deleteProduct(productId);
    if(deletedProduct){
        res.json({Deleted: deletedProduct})
    }else{
        res.json({ error: `There isn't a product with id:  ${productId}, it can't be eliminated` })
    }
})

productsRouter.put('/put/:id', async (req, res) => {
    const productId = parseInt(req.params['id']);
    const {paramName, newValue} = req.body;
    const updatedProduct = await manager.updateProduct(productId, paramName, newValue);
    if(updatedProduct){
        res.json({Updated: updatedProduct});
    }else{
        res.json({error: `There isn't a product with id:  ${productId}, it can't be updated`})
    }
})
