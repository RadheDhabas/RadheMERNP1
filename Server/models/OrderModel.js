import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.ObjectId,
            ref: 'Product'
        }
    ],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        default: 'Not Process',
        enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"]
    },

},
    { timestamps: true });
const Orders = mongoose.model('Order', OrderSchema)
export default Orders;