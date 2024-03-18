import Product from '../db/models/productModel.js';

class ProductManagerMongo {

    async getProduct(limit, page, query, sort) {
        try {
            let { category, stock } = query;

            let filters = {};

            if (category) {
                filters.category = category;
            }

            if (stock === "available") {
                filters.stock = { $gt: 0 };
            } else if (stock === "unavailable") {
                filters.stock = 0;
            }

            let sortOption = (sort === "desc") ? { price: -1 } : { price: 1 };

            let pagination = await Product.paginate(filters, {
                limit: limit,
                page: page,
                sort: sortOption
            });

            return pagination;

        } catch (err) {
            throw new Error("Error finding products: " + err)
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
            let productToUpdate = await this.getProductById(id)

            if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category) {
                throw new Error("Missing data")
            } else {
                productToUpdate = {
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
                return await Product.updateOne({ _id: id }, productToUpdate);
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