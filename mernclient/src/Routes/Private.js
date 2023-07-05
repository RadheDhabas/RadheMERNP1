import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/authContext';
import axios from "axios";
import { Outlet } from 'react-router-dom';
import Spinner from '../Components/Spinner';

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useContext(AuthContext);
console.log(auth);
  useEffect(() => {
    const authCheck = async () => {
      const response = await axios.get(`${process.env.REACT_APP_USER_AUTH}/api/auth/getuser`, {
        headers: {
          "auth-token": auth.token
        }
      });
let json  =  response;
console.log(json)
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