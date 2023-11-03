import express from 'express'
import { productsRouter } from './router/productsRouter.js';
import { cartsRouter } from './router/cartsRouter.js';

const app = express();

app.use(express.json());

app.use('/products', productsRouter);
app.use('/carts', cartsRouter)

app.listen(8080, () =>{
    console.log('Connected');
})