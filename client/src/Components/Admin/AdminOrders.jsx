import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import '../../CSS/AdminOrder.css';
import Layout from '../Layout/Layout';
import AdminMenu from "../Layout/AdminMenu";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const auth = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);
  // get all orders
  useEffect(() => {
    getOrders()
  }, [orders])
  const getOrders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USER_AUTH}/api/admin/orders`, {
        headers: {
          'auth-token': auth?.token
        }
      }
      );
      setOrders(response?.data?.orders);
      setLoading(false);
    }
    catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_USER_AUTH}/api/admin/${orderId}`, { status: newStatus }, {
        headers: {
          'auth-token': auth?.token
        }
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };



  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            {loading ? <div>Loading...</div> :
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
                        <th>Change Status</th>
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
                          <td>
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            >
                              <option value="Not Process">Not Process</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Canceled">Canceled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            }
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminOrders
