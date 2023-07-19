import React, { useContext, useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import UserMenu from '../Layout/UserMenu'
import axios from 'axios';
import '../../CSS/UserOrders.scss';
import { AuthContext } from '../../Context/authContext';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useContext(AuthContext);
  useEffect(() => {
    getAllOrders();
  }, []);
  const getAllOrders = async () => {
    const response = await axios.get(`${process.env.REACT_APP_USER_AUTH}/api/orders/buyer-order`,
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth?.token,
        }
      });
    if (response?.data) setOrders(response.data);
  }
  console.log(orders)
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <table className="order_table">
              <thead>
                <tr>
                  <th colSpan={1}>
                    No.
                  </th>
                  <th colSpan={1}>
                    Product
                  </th>
                  <th colSpan={1}>
                    Price
                  </th>
                  <th>
                    Qnty
                  </th>
                  <th>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders && orders.map((order, index) =>
                  <tr>
                    <td colSpan={1}>{index + 1}</td>
                    <td colSpan={3}>
                      {order.products && order.products.map(i =>
                        <table>
                          <tbody>
                            <tr>
                              <td>{i.name}</td>
                              <td>{i.price}</td>
                              <td>{i.quantity}</td>
                            </tr>
                          </tbody>
                        </table>
                      )}
                    </td>
                    <td colSpan={1}>
                      {order.status}
                    </td>
                  </tr>
                )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Orders