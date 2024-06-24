import React, { useContext } from 'react'
import Layout from '../Layout/Layout'
import UserMenu from '../Layout/UserMenu'
import '../../CSS/UserProfile.css'
import { useSelector } from 'react-redux'

function UserProfle() {
  const auth = useSelector(state=>state.auth)
  return (
    <Layout>
      <div className="container dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="page-profile">
              <div className="profile_infoLabel">Profile Details</div>
              <table className="profile-infoTable">
                <tbody>
                  <tr>
                    <td>Full Name</td>
                    <td>{auth?.user?.name}</td>
                  </tr>
                  <tr>
                    <td>Mobile Number</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>Email ID</td>
                    <td>{auth?.user?.email}</td>
                  </tr> 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UserProfle