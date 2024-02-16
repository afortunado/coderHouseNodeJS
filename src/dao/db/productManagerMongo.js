import Product from '../dao/db/models/productModel.js'

class ProductManagerMongo {

    async getProduct() {
        try {
            let products = await Product.find()
            return products;
        } catch (err) {
            throw new Error("Error: ", err)
        }
    }

    async getProductById(id) {
    }

    async addProduct(newProd) {
        try {
            await Product.create(newProd)
            return true;
        } catch (err) {
            throw new Error("Error: ", err);
        }
    }

    async updateProduct(id) {
    }

    async deleteProduct(id) {
    }
};

export default ProductManagerMongo;