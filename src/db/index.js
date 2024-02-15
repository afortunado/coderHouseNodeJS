import mongoose from 'mongoose'

export default {
    connect: async () => {
        return mongoose.connect("mongodb+srv://luchomartinetti93:fortuna.3000@coderhouseproject.94gq4nr.mongodb.net/ecommerce")
            .then(() => {
                console.log("Data base connected")
            }).catch((err) => {
                console.log("error: ", err)
            })
    }
}