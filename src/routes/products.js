import express from 'express';
import ProductManager from '../manager/productsM.js';
import { __dirname } from '../utilidades.js';

const router = express.Router();
const productManager = new ProductManager(__dirname + '/data/product.json');

router.post('/', async (req, res) => {
    const newProduct = req.body;
    await productManager.addProduct(newProduct);
    res.status(201).json({ mensaje: 'Producto agregado' });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const productUpdate = req.body;
    await productManager.updateProductById(id, productUpdate);
    res.status(203).json({ mensaje: 'Actualizado' });
});

router.get('/', async (req, res) => {
    const productList = await productManager.getProductList();
    res.status(201).json({ resultado: productList });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const productFind = await productManager.getProductById(id);
    res.status(201).json({ resultado: productFind });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await productManager.deleteProductById(id);
    res.status(200).json({ mensaje: 'Producto eliminado' });
});

export default router;