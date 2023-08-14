import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./Layout/Layout";
import { useNavigate, Link,useLocation } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'; 

const Signup = () => {
  const url = `${process.env.REACT_APP_USER_AUTH}/api/auth/createuser`;

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  let location = useLocation();
  const [auth,setAuth] = useContext(AuthContext);
  useEffect(() => {
    if (auth?.user) {
      navigate("/");
    }
}, [auth, navigate]);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const signupSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    setResponse(json);
    if (response.status == 200) {
      toast.success( "Account created successfully", {
        position: "top-center",
        autoClose: 1000,
        });
      setTimeout(()=>navigate("/login") ,2000);
    } 
    toast.error( json.error, {
      position: "top-right",
      autoClose: 2000,
      });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (res) => {
        try { 
            let json = await axios.post(`${url}/api/auth/google-login`, { tokenId: res.access_token});
            // const json = await response.json()
            if (json && json?.data.success) {
                // Save the auth token and redirect
                setAuth({
                    ...auth,
                    token: json?.data.authToken,
                    user: json?.data.user
                })
                localStorage.setItem('token', JSON.stringify(json.data));
                navigate(location.state || "/")
            }
            else {
                console.log(json)
            }
        } catch (error) {
            console.error("Login Error", error);
        }
    },
    
}); 

  return (
    <Layout> 
      <div className='login_screen_form'>
        <div className='signIn_form'>
          <h1 className='form_heading'>Create account on Candela</h1>
          <div className='sign_google_box'>
            <form>
              <button name="button" onClick={()=>googleLogin()} className="sinin_with_google_btn">
                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18" fill="none" role="img" className="icon ">
                  <path fillRule="evenodd" clipRule="evenodd" d="M17.64 9.20419C17.64 8.56601 17.5827 7.95237 17.4764 7.36328H9V10.8446H13.8436C13.635 11.9696 13.0009 12.9228 12.0477 13.561V15.8192H14.9564C16.6582 14.2524 17.64 11.9451 17.64 9.20419Z" fill="#4285F4" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.99976 18C11.4298 18 13.467 17.1941 14.9561 15.8195L12.0475 13.5613C11.2416 14.1013 10.2107 14.4204 8.99976 14.4204C6.65567 14.4204 4.67158 12.8372 3.96385 10.71H0.957031V13.0418C2.43794 15.9831 5.48158 18 8.99976 18Z" fill="#34A853" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.96409 10.7098C3.78409 10.1698 3.68182 9.59301 3.68182 8.99983C3.68182 8.40664 3.78409 7.82983 3.96409 7.28983V4.95801H0.957273C0.347727 6.17301 0 7.54755 0 8.99983C0 10.4521 0.347727 11.8266 0.957273 13.0416L3.96409 10.7098Z" fill="#FBBC05" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.99976 3.57955C10.3211 3.57955 11.5075 4.03364 12.4402 4.92545L15.0216 2.34409C13.4629 0.891818 11.4257 0 8.99976 0C5.48158 0 2.43794 2.01682 0.957031 4.95818L3.96385 7.29C4.67158 5.16273 6.65567 3.57955 8.99976 3.57955Z" fill="#EA4335" />
                </svg>
                Sign Up with Google
              </button>
            </form>
          </div>
          <div className='other_option'>
            <span>
              or sign up with email
            </span>
          </div>
          <div className='form_field'>
            <form onSubmit={signupSubmit}>
              <div>
                <label htmlFor="name">Full Name</label>
                <input type="text" name="name" className="form-control" id="name" onChange={onChange} />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" onChange={onChange} id="email" name="email" />
              </div>
              <div>
                <label htmlFor="password" className="">Password </label>
                <input type="password" onChange={onChange} name="password" id="password" />
              </div>
              <button type="submit" className="sign_btn">Sign Up</button>
            </form>
          </div>
          <div className='sign_up_text'>
            Already have an account? <Link to={'/login'} className='signup_link_btn'>Sign In</Link>
          </div>
        </div>
      </div>
      <ToastContainer />
   
    </Layout>
  );
};

export default Signup;
