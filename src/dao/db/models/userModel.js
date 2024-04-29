import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    idCart: {
        type: mongoose.Types.ObjectId,
        ref: "Cart",
    }
},
    {
        timestamps: true,
        strict: false
    }
)

const User = mongoose.model('User', UserSchema);

export default User;