import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: Number,
        default: 0,
    },
    googleId: {
        type: String,
    },
    password: {
        type: String,
        required: function () {
            // The password field is required only for manual registration
            return this.googleId ? false : true;
        },
    },

    googleEmail: {
        type: String,
    },
    wishlist: [
        {
            type: mongoose.ObjectId,
            ref: 'Product'
        }],
    cart: [
        {
            type: mongoose.ObjectId,
            ref: 'Product'
        }],
    date: { type: Date, default: Date.now },
});
const User = mongoose.model('User', UserSchema);
export default User