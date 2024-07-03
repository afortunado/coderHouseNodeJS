import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firts_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    age: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    idCart: {
        type: mongoose.Types.ObjectId,
        ref: "Cart",
    },
    role: {
        type: String,
        require: true,
        enum: ["user", "admin", "premium"],
        default: "user"
    }
},
    {
        timestamps: true,
        strict: false
    }
)

const User = mongoose.model('User', UserSchema);

export default User;