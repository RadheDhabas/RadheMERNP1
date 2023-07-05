import React, {useState,useContext, useEffect} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import Layout from './Layout/Layout';
import { AuthContext } from '../Context/authContext';

const url = process.env.REACT_APP_USER_AUTH;
const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let history = useNavigate();
    let location = useLocation();
    let [auth,setAuth] = useContext(AuthContext);

    useEffect(()=>{
        if(auth?.user){
            history("/");
        }
    },[auth,history]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${url}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json() 
     
        if (json && json.success){
            // Save the auth token and redirect
            setAuth({
                ...auth,
                token:json.authToken,
                user:json.user
            }) 
             localStorage.setItem('token',JSON.stringify(json)); 
            history(location.state||"/"); 
        }
        else{
           console.log(json)
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return ( 
        <Layout>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </Layout>)
    
}

export default Login