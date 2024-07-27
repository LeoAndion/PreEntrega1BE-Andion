import express from 'express';
import CartManager from '../manager/cartM.js';
import { __dirname } from '../utilidades.js';

const router = express.Router();
const cartManager = new CartManager(__dirname + '/data/carts.json');

router.post('/', async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json({ MSJ: 'Nuevo carrito creado', cart: newCart });
});

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    res.status(200).json(cart);
});

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    await cartManager.addProductToCart(cid, pid);
    res.status(200).json({ MSJ: 'Producto agregado al carrito' });
});

export default router;