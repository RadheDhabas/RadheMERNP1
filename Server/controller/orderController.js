import Orders from "../models/OrderModel.js"

export const getOrderController = async (req, res) => {
    try {
        const orders = await Orders.find({ 'buyer': req.user.id }).populate('products');

        if (orders) {
          return  res.status(200).send(orders)
        }
res.status(500).send("Error occured in order controller ")

    } catch (error) {
        console.error("Error while fetching orders for buyer" + error)
    }
}