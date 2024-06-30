import React from 'react'
import { NavLink } from 'react-router-dom'
function UserMenu() {
  return (
    <>
       <div className="text-center">
        <div className="list-group ">
          <h4 className='all_product_heading'>User Panel</h4>
          <NavLink
            to="/my-account"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/my-orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
          <NavLink
            to="/my-wishlist"
            className="list-group-item list-group-item-action"
          >
            Wishlist
          </NavLink>
        </div>
      </div></>
  )
}

export default UserMenu