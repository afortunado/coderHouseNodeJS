import {faker} from '@faker-js/faker'

const categories = ["food", "drinks", "stuff"]

export const generateProduct = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        code: faker.string.alphanumeric(6),
        stock: faker.commerce.int({min:0, max:20}),
        category: categories[faker.commercec.number({ min: 0, max: categories.length - 1 })]
    }
 }