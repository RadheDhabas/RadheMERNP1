import React, { useState, useEffect } from "react";
import Layout from "./Layout/Layout";
import { useNavigate,useLocation } from "react-router-dom";
function Spinner() {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(2);
  useEffect(() => {
   const timer = setTimeout(() => {
      if (count === 1) {
        navigate("/login", { state: location.pathname });
      }
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, navigate, location]);
  return (
    <Layout>
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </Layout>
  );
}

export default Spinner;
