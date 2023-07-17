import React, { useContext } from 'react'
import Layout from '../Layout/Layout'
import UserMenu from '../Layout/UserMenu'
import { AuthContext } from '../../Context/authContext'

function UserProfle() {
  const [auth,setAuth] = useContext(AuthContext);
  return (
    <Layout>
         <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-3">
             User profile page {JSON.stringify(auth)}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UserProfle