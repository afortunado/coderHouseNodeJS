import mongoose from 'mongoose';

const UserSchema = mongoose.model('user', new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        trype: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
},
    {
        timestamps: true,
        strict: false
    }
))

export default UserSchema;