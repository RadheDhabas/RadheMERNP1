import React, { useState } from "react";
import Layout from "./Layout/Layout";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const url = `${process.env.REACT_APP_USER_AUTH}/api/auth/createuser`;

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
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
      navigate("/login");
    }
  };
  return (
    <Layout>
      <h1>User Registeration</h1>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>

      {response !== "" && <p>{response.error}</p>}
    </Layout>
  );
};

export default Signup;
