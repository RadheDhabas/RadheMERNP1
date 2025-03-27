import React, { useContext } from 'react'
import Layout from '../Layout/Layout'
import AdminMenu from '../Layout/AdminMenu';
import { useSelector } from 'react-redux';

function AdminDashboard() {
  const auth = useSelector(state=>state.auth);
  return (
    <Layout>
       <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <p> Admin Name : {auth?.user?.name}</p>
              <p> Admin Email : {auth?.user?.email}</p>
              <p> Admin Contact : {auth?.user?.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard