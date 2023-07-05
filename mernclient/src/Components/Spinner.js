import React, { useState, useEffect } from "react";
import Layout from "./Layout/Layout";
import { useNavigate,useLocation } from "react-router-dom";
function Spinner() {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(2);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`/login`, {
        state: location.pathname,
      });
    return () => clearInterval(interval); 
  }, [count, navigate, location]);
  return (
    <Layout>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </Layout>
  );
}

export default Spinner;
