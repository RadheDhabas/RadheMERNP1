import React, { useContext } from 'react'
import Layout from '../Layout/Layout'
import UserMenu from '../Layout/UserMenu'
import { AuthContext } from '../../Context/authContext'
function Dashboard() {
  const [auth,setAuth] = useContext(AuthContext);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <p> User Name : {auth?.user?.name}</p>
              <p> User Email : {auth?.user?.email}</p>
              <p> User Contact : {auth?.user?.phone}</p>
            </div>
          </div>
        </div>
      </div>
      </Layout>
  )
}

export default Dashboard