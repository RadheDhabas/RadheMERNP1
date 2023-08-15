import React, { useContext } from 'react'
import Layout from '../Layout/Layout'
import UserMenu from '../Layout/UserMenu'
import { AuthContext } from '../../Context/authContext'
import '../../CSS/UserProfile.css'

function UserProfle() {
  const [auth, setAuth] = useContext(AuthContext);
  return (
    <Layout>
      <div className="container dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div class="page-profile">
              <div class="profile_infoLabel">Profile Details</div>
              <table class="profile-infoTable">
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