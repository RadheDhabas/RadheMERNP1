import mongoose from 'mongoose';
const { Schema } = mongoose;

const CartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items:{
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
        quantity:{
            type:Number,
            default:1,
        }
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Cart = mongoose.model('Cart', CartSchema);
export default Cart;