import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const RegisterPage = () => {
    
  const { handleUserRegister } = useAuth();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className="auth--container">
      <div className="form--wrapper">
        <form
          onSubmit={(e) => {
            handleUserRegister(e, credentials);
          }}
        >
          <div className="field--wrapper">
            <label htmlFor="name">name:</label>
            <input
              id="name"
              required
              type="text"
              name="name"
              placeholder="Enter your name..."
              value={credentials.name}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </div>
          <div className="field--wrapper">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              required
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={credentials.email}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </div>

          <div className="field--wrapper">
            <label htmlFor="password1">Password:</label>
            <input
              id="password1"
              required
              type="password"
              name="password1"
              placeholder="Enter password..."
              value={credentials.password1}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </div>
          <div className="field--wrapper">
            <label htmlFor="password2">Confirm password:</label>
            <input
              id="password2"
              required
              type="password"
              name="password2"
              placeholder="Comfirm your password..."
              value={credentials.password2}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </div>

          <div className="field--wrapper">
            <input
              type="submit"
              value="Register"
              className="btn btn--lg btn--main"
            />
          </div>
        </form>

        <p>
          Already have an account? Login <Link to="/login">here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
