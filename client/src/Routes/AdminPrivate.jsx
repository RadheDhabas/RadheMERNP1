import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Outlet } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import { useSelector } from 'react-redux';

export default function AdminPrivateRoute() {
    const[ok,setOk] = useState(false);
    const auth = useSelector(state=>state.auth);
    
   
    useEffect(()=>{
        const authCheck = async()=>{
            const response =await axios.get(`${import.meta.env.VITE_USER_AUTH}/api/auth/admin-auth`,{
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

