import fs from 'node:fs';

class ProductManager {
    constructor(path) {
        this.path = path;
        this.productList = [];
    }

    async getProductById(id){

        await this.getProductList();
        return this.productList.find(product => product.id === id); 
    }

    async getProductList() {
        const data = await fs.promises.readFile(this.path, 'utf-8');
            this.productList = JSON.parse(data);
            return this.productList;
    }

    /*
    async addProduct(product){
        this.productList = await this.getProductList(;)
        const newProduct = {
            title: 'Chori'
        }
        await fs.promises.writeFile(this.path, JSON.stringify({ data: [newProduct] }))
    }*/
    generarID() {
            return Math.random().toString(18)
            //verify uniq(Si no le pido disculpas profe)
        }


    async addProduct(product) {
        await this.getProductList();
        
        const newProduct = {
            id: this.generarID(), 
            status: true, 
            ...product
        };

        const requiredF = ['Titulo', 'description', 'code', 'price', 'stock', 'category'];
        for (const field of requiredF) {
            if (!newProduct[field]) {
                throw new Error(`El campo ${field} es obligatorio`);
            }
        }

        this.productList.push(newProduct);
        
        await fs.promises.writeFile(this.path, JSON.stringify(this.productList, null, 2));
    }


    async updateProductById(id, productUpdate) {
        await this.getProductList();
        const productIndex = this.productList.findIndex(product => product.id === id);

        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }

        this.productList[productIndex] = { ...this.productList[productIndex], ...productUpdate };
        await fs.promises.writeFile(this.path, JSON.stringify(this.productList, null, 2));
    }

    async deleteProductById(id) {
        await this.getProductList();
        this.productList = this.productList.filter(product => product.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(this.productList, null, 2));
    }


}

export default ProductManager