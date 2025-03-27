import axios from 'axios';
import { store } from '../Redux/store';
import { ResetCart } from '../Redux/Reducers/cartSlice';
// for payment handling
export const handleCheckout = async (cart,auth) => {
    try {
        const response = (await axios.post(`${import.meta.env.VITE_USER_AUTH}/payment/orders`, { cart }));
        if (!response) {
            alert("Server error. Are you online?");
            return;
        }

        // Getting the order details back
        const { amount, id: order_id, currency } = response.data;

        const options = {
            key: import.meta.env.VITE_RZ_KEY_ID, // Enter the Key ID generated from the Razorpay  Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "CandelA",
            description: "Test Transaction",
            //  image: { logo },
            order_id: order_id,
            handler: async function (response) {

                //this response is given by razorpay after making payment

                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    amount: amount,
                    cart
                };

                const result = await axios.post(`${import.meta.env.VITE_USER_AUTH}/payment/verify`,
                    data,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": auth?.token,
                        }
                    },
                );
                if (result.data) {
                    store.dispatch(ResetCart());
                    window.location.href = "/my-orders"
                }
                // here we can show messages like order placed or something else
            },

        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

    } catch (error) {
        console.error(error);
    }

};
