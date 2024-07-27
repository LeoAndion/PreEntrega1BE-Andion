import express from 'express';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.get('/', (req, res) => {
    res.status(200).send('Servidor Funcando');
});

app.listen(8080, () => {
    console.log('Servidor Funcando');
});