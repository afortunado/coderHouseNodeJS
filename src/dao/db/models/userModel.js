import mongoose from 'mongoose';

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
    }
},
    {
        timestamps: true,
        strict: false
    }
)

const User = mongoose.model('User', UserSchema);

export default User;