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
        `${process.env.REACT_APP_USER_AUTH}/api/orders/buyer-order`, {
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
              <h1 className='all_product_heading'>My Orders</h1>
              {loading ? <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
                : (
                  orders.length === 0 ? (
                    <p>No orders found</p>
                  ) :
                    (
      <table className="custom-table">
        <thead className="custom-table-header">
          <tr>
            <th scope="col" className="custom-th customer-column">Product</th>
            <th scope="col" className="custom-th">Order Id</th>
            <th scope="col" className="custom-th">Amount</th>
            <th scope="col" className="custom-th">Date</th>
            <th scope="col" className="custom-th">Status</th>
          </tr>
        </thead>
        <tbody className="custom-table-body">
          {orders.map((order, index) => (
            <tr key={order._id} className="custom-row">
              <td className="custom-cell customer-cell">
                <div className="customer-info">
                  {order.products.map((product) => (
                    <div key={product._id}>
                      <img src={order.photo} className="customer-image" width={28} height={28} alt='' />
                      <p> {product.name}</p>
                    </div>
                  ))}
                </div>
              </td>
              <td className="custom-cell">{order._id}</td>
              <td className="custom-cell">{formatCurrency(order.payment)}</td>
              <td className="custom-cell">{formatDateToLocal(order.createdAt)}</td>
              <td className="custom-cell">
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

)
                )
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Orders
