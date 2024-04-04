import mongoose, { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    idCart: {
        type: Schema.Types.ObjectId,
        ref: "Cart",
        required: true
    }
},
    {
        timestamps: true,
        strict: false
    }
)

const User = mongoose.model('User', UserSchema);

export default User;