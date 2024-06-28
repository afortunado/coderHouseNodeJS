import chai from 'chai'
import supertest from 'supertest'
import mongoose from 'mongoose'

const expect = chai.expect;
const requester = supertest("http://localhost:8080")

mongoose.connect("mongodb+srv://luchomartinetti93:fortuna.3000@coderhouseproject.94gq4nr.mongodb.net/ecommerce")

describe('Testing ecommerce API: products', ()=> {

    beforeEach(()=>{
        mongoose.connection.collections.products.drop();
    })

    it("Create product: POST api/products/ should create correctly a product", async () => {
        const productData = {
            title: "Sample Product",
            description: "Product description",
            price: 20,
            code: 34254,
        };
    
        const response = await requester.post("/api/products").send(productData);
        expect(response.statusCode).to.equal(201);
    });
    

    it("Get product by ID: GET api/products/:pid should return the right product", async () => {
        const productData = {
            title: "Sample Product",
            description: "Product description",
            price: 20,
            code: 34254,
        };
        const response = (await requester.get('/api/products')).send(productData);
        const productId = response._id
        const response2 = await requester.get(`/api/products/${productId}`);
        expect(response2.status).to.equal(201);
    });
    

    it("Delete product: DELETE api/products/:pid should delete the product according to its ID", async () => {
        const productData = {
            title: "Sample Product",
            description: "Product description",
            price: 20,
            code: 34254,
        };
        const response = (await requester.get('/api/products')).send(productData);
        const productId = response._id
        const response2 = await requester.delete(`/api/products/${productId}`);
        expect(response2.status).to.equal(201);
    });

    afterEach(()=>{
        mongoose.connection.collections.products.drop();
    })
    
})