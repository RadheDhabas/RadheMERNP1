import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/authContext';
import axios from "axios";
import { Outlet } from 'react-router-dom';
import Spinner from '../Components/Spinner';

export default function AdminPrivateRoute() {
    const[ok,setOk] = useState(false);
    const [auth,setAuth] = useContext(AuthContext);
    
   
    useEffect(()=>{
        const authCheck = async()=>{
            const response =await axios.get(`${process.env.REACT_APP_USER_AUTH}/api/auth/admin-auth`,{
                headers: {
                    "auth-token": auth?.token
                }
            });     
            if (response.data.ok) {
                setOk(true);
              } else {
                setOk(false);
              }
        } ; 
        if(auth?.token){
            authCheck();
        }
    },[auth?.token,auth]); 
  return ok?<Outlet/>:<Spinner/>;
}

