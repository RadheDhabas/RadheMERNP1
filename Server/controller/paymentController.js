import Razorpay from 'razorpay';
import crypto from 'crypto'
import Orders from '../models/OrderModel.js';

export const paymentOrderController = async(req,res)=>{
try {
    const cart = req.body.cart;
    const netValue = req.body.cart.reduce((a, b) => a + b.quantity * b.price, 0)
    var instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
      }); 
      const options = {
        amount: netValue*100, 
        currency: "INR", 
    };

    const result = await instance.orders.create(options);

        if (!result) return res.status(500).send("Some error occured in payment order controller");

    res.json(result);
        
} catch (error) {
     res.status(500).send("error in payment controller"+error);
}
}

// verify payment 
export const paymentVerifyController = async(req,res)=>{
    try {
        const {orderCreationId,razorpayPaymentId,razorpayOrderId,razorpaySignature,amount,cart} = req.body;
        var instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
          });
        
          const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

          shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
  
          const digest = shasum.digest("hex");
          if (digest !== razorpaySignature)
          return res.status(400).json({ msg: "Transaction not legit!" });

      // THE PAYMENT IS LEGIT & VERIFIED
      // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
      const order = await Orders.create({
        products:cart,
        payment:amount,
        buyer:req.user.id, 
    }) ;

      res.json({
          msg: "success",
          orderId: razorpayOrderId,
          paymentId: razorpayPaymentId,
      });
        } catch (error) {
        console.error(error);
    }
    }