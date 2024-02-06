import { promises as fsPromises } from 'fs';
import uuid4 from 'uuid4';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {
            const readedFile = await fsPromises.readFile(this.path, 'utf-8')
            const products = JSON.parse(readedFile);
            return products;
        } catch (err) {
            return [];
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const findProduct = products.find((e) => e.id === id)
            if (!findProduct) {
                throw new Error(`Product not founded: ${id}`);
            }
            return findProduct;
        } catch (err) {
            console.log("Something happened")
        }
    }

    async addProduct(newProd) {
        let productId = uuid4();
        const product = {
            title: newProd.title,
            description: newProd.description,
            price: newProd.price,
            thumbnail: newProd.thumbnail ?? [],
            code: newProd.code,
            stock: newProd.stock,
            category: newProd.category,
            status: newProd.status ?? true,
            id: productId
        };
        try {
            const validatedProduct = await this.validateProduct(product.title, product.description, product.price, product.code, product.stock, product.category);
            if (!validatedProduct) {
                const existingProducts = await this.getProducts();
                const updatedProducts = [...existingProducts, product];
                const updatedFile = JSON.stringify(updatedProducts, null, 2);
                await fsPromises.writeFile(this.path, updatedFile, 'utf-8');
                console.log('Product added successfully.');
            }
        } catch (err) {
            console.error('Error adding product:' + err.message);
        }
    }

    async updateProducts(id, product) {
        try {
            const productToUpdate = await this.getProductById(id);

            if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category) {
                throw new Error("Missing data")
            } else {
                productToUpdate.title = product.title;
                productToUpdate.description = product.description;
                productToUpdate.price = product.price;
                productToUpdate.thumbnail = product.thumbnail ?? [];
                productToUpdate.code = product.code;
                productToUpdate.stock = product.stock;
                productToUpdate.category = product.category;
                productToUpdate.status = product.status ?? true;

                const updatedFile = JSON.stringify(newArray, null, 2);
                await fsPromises.writeFile(this.path, updatedFile, 'utf-8');
            }
        } catch (err) {
            console.log('Error', err)
        }
    }

    async deleteProducts(id) {
        try {
            const products = await this.getProducts();
            const updatedProducts = products.filter(p => p.id !== id);
            const updatedFile = JSON.stringify(updatedProducts, null, 2);
            await fsPromises.writeFile(this.path, updatedFile, 'UTF-8')
        } catch (err) {
            console.log("Something happened", err)
        }
    }

    async validateProduct(title, description, price, code, stock, category) {
        try {
            const validateCode = await this.getProducts()
            const repeatedCode = validateCode.some(repeatedCode => repeatedCode.code === code)
            if (!title || !description || !price || !code || !stock || !category || repeatedCode) {
                throw new Error("Missing data or repeated code")
            }
            return true
        } catch (err) {
            console.log('Error', err.message)
            throw err;
        }
    }
}

export default ProductManager;






