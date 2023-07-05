import React, { useContext, useState } from 'react'
import Layout from './Layout/Layout';
import { AuthContext } from '../Context/authContext';
// import axios form 'ax'
// import { useLocation } from 'react-router-dom';

function About() {
    const [auth,setAuth] = useContext(AuthContext);
    return (
        <Layout> 
            {JSON.stringify(auth)}
        </Layout>
    )
}

export default About