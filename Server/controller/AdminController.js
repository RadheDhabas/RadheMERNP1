import mongoose from "mongoose";
import Orders from "../models/OrderModel.js";


export const getAllOrders = async (req, res) => {
    try {
        const orders = await Orders.find().populate('products')
        return res.status(200).send({ orders })
    } catch (error) {
        console.log('Error occured while fetching orders for admin', error)
    }
}

export const updateStatus = async (req, res) => {
    const newstatus = req.body.status;
    const { orderId } = req.params;
    try {
        const order = await Orders.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = newstatus;
        await order.save();
    } catch (error) {
        console.log('Error occured while fetching orders for admin', error)
    }
}