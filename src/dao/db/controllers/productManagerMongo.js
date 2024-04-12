import Product from '../models/productModel.js';

class ProductManagerMongo {

    static async getProduct (req, res, next) {
        const { limit = 10, page = 1, sort = "", category = "" } = req.query;

        try {
            let filters = {stock: { $gt: 0 } };

            if (category) {filters.category = query.category;}

            let options =  { limit: parseInt(limit), page: parseInt(page)}

            if(sort){ price.sort = { price: sort === "desc" ? -1 : 1 }};

            let pagination = await Product.paginate(filters, options);
            return res.render("products", { productos: pagination.docs });
            /*return res.status(200).json({
                msg: 'Productos encontrados',
                Data: pagination
            })*/
        } catch (err) {
            next(err);
        }
    }

    static async getProductById (req, res, next) {
            let productId = req.params.pid;
        try {
            let singleProduct = await Product.findOne({ _id: productId })
            return res.status(200).json(singleProduct);;
        } catch (err) {
            next(err)
        }
    }

    static async addProduct (req, res, next) {
        const newProd = req.body
        try {
            let productAdded = await Product.create(newProd)
            return res.status(200).json(productAdded);
        } catch (err) {
            next(err);
        }
    }

    static async updateProduct (req, res, next) {
            const idProduct = req.params.pid;
            const product = req.body;
        try {
            let productToUpdate = await this.getProductById(idProduct)

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
                let productUpdated = await Product.updateOne({ _id: id }, productToUpdate);
                return res.status(200).json(productUpdated);
            }

        } catch (err) {
            next(err);
        }
    }

    static async deleteProduct (req, res, next) {
            const idProduct = req.params.pid;
        try {
            let deletedProduct = await Product.deleteOne({ _id: idProduct })
            return res.status(200).json(deletedProduct);
        } catch (err) {
            next(err);
        }
    }
};

export default ProductManagerMongo;