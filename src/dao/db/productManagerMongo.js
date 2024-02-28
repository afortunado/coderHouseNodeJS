import Product from '../db/models/productModel.js'

class ProductManagerMongo {

    async getProduct(limit, page, query, sort) {
        try {
            let products = await Product.find()
            const productLimit = limit && !isNaN(limit) ? parseInt(limit) : 10;
            const currentPage = page && !isNaN(page) ? parseInt(page) : 1;
            products = products.limit(productLimit);
            return products;
        } catch (err) {
            throw new Error("Error finding products: ", err)
        }
    }

    async getProductById(id) {
        try {
            let singleProduct = await Product.findOne({ _id: id })
            return singleProduct;
        } catch (err) {
            throw new Error("Error finding ID:".err)
        }
    }

    async addProduct(newProd) {
        try {
            await Product.create(newProd)
            return true;
        } catch (err) {
            throw new Error("Error: ", err);
        }
    }

    async updateProduct(id, product) {
        try {
            console.log(id, product)
            let productToUpdate = await this.getProductById(id)

            if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category) {
                throw new Error("Missing data")
            } else {
                const updatedProduct = {
                    $set: {
                        title: product.title,
                        description: product.description,
                        price: product.price,
                        thumbnail: product.thumbnail ?? [],
                        code: product.code,
                        stock: product.stock,
                        category: product.category,
                        status: product.status ?? true
                    }
                }
                return await Product.updateOne({ _id: id }, updatedProduct);
            }

        } catch (err) {
            throw new Error("Error: Couldn´t update product", err)
        }
    }

    async deleteProduct(id) {
        try {
            let deletedProduct = await Product.deleteOne({ _id: id })
            return deletedProduct
        } catch (err) {
            throw new Error("Error: ", err)
        }
    }
};

export default ProductManagerMongo;