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
            thumbnail: newProd.thumbnail || 'no image',
            code: newProd.code,
            stock: newProd.stock,
            category: newProd.category,
            status: true,
            id: productId
        };
        try {
            await this.validateProduct(product);
            const existingProducts = await this.getProducts();
            const updatedProducts = [...existingProducts, product];
            const updatedFile = JSON.stringify(updatedProducts, null, 2);
            await fsPromises.writeFile(this.path, updatedFile, 'utf-8');
            console.log('Product added successfully.');
        } catch (err) {
            console.error('Error adding product:' + err.message);
        }
    }

    async updateProducts(id, product) {
        try {
            const products = await this.getProducts();
            const productToupdate = products.find((p) => p.id === id);
            const productChecked = await this.validateProduct(productToupdate);
            console.log(productChecked)
            if (productChecked) {
                productChecked.title = product.title;
                productChecked.description = product.description;
                productChecked.price = product.price;
                productChecked.thumbnail = product.thumbnail;
                productChecked.code = product.code;
                productChecked.stock = product.stock;

                const newArray = products.filter(p => p.id !== id)
                newArray.push(productToupdate)
                const updatedFile = JSON.stringify(newArray, null, 2);
                await fsPromises.writeFile(this.path, updatedFile, 'utf-8');
            }
        } catch (err) {
            console.log('Eror', err)
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

    async validateProduct(product) {
        const requiredFields = ['id', 'title', 'description', 'price', 'code', 'stock', 'category'];
        for (const field of requiredFields) {
            if (!(field in product)) {
                throw new Error('Wrong data entry');
            } else { await this.validateCode(product.code) }
        }
    }

    async validateCode(code) {
        try {
            const validateCode = await this.getProducts()
            if (validateCode.some(repeatedCode => repeatedCode.code === code)) {
                throw new Error('Repeated code')
            }
        } catch (err) {
            throw new Error("Something happened: " + err.message)
        }
    }
}




export default ProductManager;

//const productManager = new ProductManager();
//productManager.addProduct("pepper", "best pepper in the world", 10, "PEPPER_IMG", 545, 100);
//productManager.getProductById(0.6591661393199997)
//productManager.appendTofile("blablablablabla")
//productManager.getProducts();
//productManager.deleteFile()





