import React from 'react'
import Layout from '../Layout/Layout'
import AdminMenu from '../Layout/AdminMenu'

function User() {
  return (
    <Layout>
        <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-3">
             Users in admin
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default User