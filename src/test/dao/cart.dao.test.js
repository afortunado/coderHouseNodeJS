import chai from 'chai'
import supertest from 'supertest'
import mongoose from 'mongoose'

const expect = chai.expect;
const requester = supertest("http://localhost:8080")

mongoose.connect("mongodb+srv://luchomartinetti93:fortuna.3000@coderhouseproject.94gq4nr.mongodb.net/ecommerce")

describe('Testing ecommerce API: cart', ()=> {

    
    afterEach(()=>{
        mongoose.connection.collections.cart.drop();
    })
    
})