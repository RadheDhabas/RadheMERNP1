import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Outlet } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import { useSelector } from 'react-redux';

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const auth = useSelector(state=>state.auth)
 
  useEffect(() => {
    const authCheck = async () => {
      const response = await axios.get(`${import.meta.env.VITE_USER_AUTH}/api/auth/getuser`, {
        headers: {
          "auth-token": auth.token
        }
      });
let json  =  response; 
      if (json.data.success) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
if(auth?.token)
   { authCheck();}

    
  }, [auth?.token, ok]);
  return ok ? <Outlet /> : <Spinner />;
}