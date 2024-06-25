import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Layout from '../Layout/Layout'
import UserMenu from '../Layout/UserMenu'
import axios from 'axios';
import '../../CSS/AdminOrder.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const auth = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);
  // get all orders
  useEffect(() => {
    getOrders()
  }, [])
  const getOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_USER_AUTH}/api/orders//buyer-order`, {
        headers: {
          'auth-token': auth?.token
        }
      }
      );
      setOrders(response?.data);
      setLoading(false);
    }
    catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="container dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="buyer-orders">
              <h1>Buyer Orders</h1>
              {orders.length === 0 ? (
                <p>No orders found</p>
              ) : (
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Serial No.</th>
                      <th>Order ID</th>
                      <th>Buyer</th>
                      <th>Products</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order._id}>
                        <td>{index + 1}</td>
                        <td>{order._id}</td>
                        <td>{order.buyer}</td>
                        <td>
                          {order.products.map((product) => (
                            <div key={product._id}>
                              {product.name} (Quantity: {product.quantity})
                            </div>
                          ))}
                        </td>
                        <td>{order.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Orders