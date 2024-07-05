import express from 'express';
import ProductManager from './class/productsM.js';
import { __dirname } from './utilidades.js';

import CartManager from './class/cartM.js';





const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const productManager = new ProductManager(__dirname + '/public/product.json');
const cartManager = new CartManager(__dirname + '/public/carts.json');



/*CARRITO!!*/
app.post('/api/carts', async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json({ MSJ: 'Nuevo carrito creado', cart: newCart });

});

app.get('/api/carts/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    res.status(200).json(cart);


});

app.post('/api/carts/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    await cartManager.addProductToCart(cid, pid);
    res.status(200).json({ MSJ: 'Producto agregado al carrito' });



});

/*PRODUCTO!!!!*/


app.post('/api/products', async (req, res) => {
    const newProduct = req.body; 
    await productManager.addProduct(newProduct);
    res.status(201).json({ mensaje: 'Producto agregado' });
    
});

app.put('/api/products/:id' , async (req,res) => {
    // console.log('Entrada Error1')

    const {id } = req.params
    const productUpdate = req.body
//class productM crear metodo que reciba el ID, busque el producto y lo actualice en el archivo 

    await productManager.updateProductById(id, productUpdate);
    // console.log('Entrada Error2')
    res.status(203).json({mensaje: 'Actualizado'})
})

app.get('/', async (req,res) =>{
    const productList = await productManager.getProductList();
    res.status(201).json({resultado: productList})
})

app.get('/:id' , async (req,res) =>{

    const {id} = req.params

    const productFind = await productManager.getProductById(id)

    res.status(201).json({resultado: productFind})
})

app.delete('/api/products/:id', async (req, res) => {

    const { id } = req.params;
    await productManager.deleteProductById(id);

    res.status(200).json({ mensaje: 'Producto eliminado' });
    


})

 

app.listen(8080,() =>{
    console.log("Servidor Funcando")
});