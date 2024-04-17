import Product from '../models/productModel.js';

const productService = {};

productService.getProduct = async (query) => {
    const { limit = 10, page = 1, sort = "", category = "" } = query;
    let filters = { stock: { $gt: 0 } };
    if (category) { filters.category = category; }
    let options = { limit: parseInt(limit), page: parseInt(page) };
    if (sort) { options.sort = { price: sort === "desc" ? -1 : 1 } };
    const pagination = await Product.paginate(filters, options);
    return pagination.docs;
};

productService.getProductById = async (productId) => {
    return await Product.findOne({ _id: productId });
};

productService.addProduct = async (newProd) => {
    return await Product.create(newProd);
};

productService.updateProduct = async (idProduct, product) => {
    if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category) {
        throw new Error("Missing data");
    }
    const productToUpdate = {
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
    };
    return await Product.updateOne({ _id: idProduct }, productToUpdate);
};

productService.deleteProduct = async (idProduct) => {
    return await Product.deleteOne({ _id: idProduct });
};

export default productService;
