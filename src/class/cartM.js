import fs from 'node:fs';

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
    }

    async addProductToCart(id, productId) {
        await this.getCarts();
        const cartIndex = this.carts.findIndex(cart => cart.id === id);

        const productIndex = this.carts[cartIndex].products.findIndex(prod => prod.id === productId);

        if (productIndex === -1) {
            this.carts[cartIndex].products.push({ id: productId, quantity: 1 });
        } else {
            this.carts[cartIndex].products[productIndex].quantity += 1;
        }

        await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }


    async getCarts() {
        const data = await fs.promises.readFile(this.path, 'utf-8');
            this.carts = JSON.parse(data);
            return this.carts;
    }

    async createCart() {
        const carts = await this.getCarts();
        const newCart = {
            id: this.generarID(), 
            products: [] 
        };
        this.carts.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
        return newCart;
    }

    generarID() {
        return Math.random().toString(18)
    }

    async getCartById(cartId) {
        const carts = await this.getCarts();
        return carts.find(cart => cart.id === cartId);
    }

    



    

}

export default CartManager;
