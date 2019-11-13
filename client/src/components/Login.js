import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { ButtonContainer } from "../styled-components/Button";
import axios from "axios";

const Login = props => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const changeHandler = event => {
    event.preventDefault();
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  const login = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
      })
      .catch(err => console.log(err.response));
    props.history.push("/bubble");
  };

  return (
    <div className="loginModal">
      <form
        className="login-modal"
        onSubmit={login}
        onKeyDown={props.closeLoginHandler2}
        tabIndex="0"
      >
        <h1 className="loginTitle">Welcome Back</h1>
        <p className="loginInputs">
          <label>
            Username:
            <input
              className="input-modal"
              type="text"
              name="username"
              onChange={changeHandler}
              value={credentials.username}
            />
          </label>
        </p>

        <p className="loginInputs">
          <label>
            Password:
            <input
              className="input-modal"
              type="password"
              name="password"
              onChange={changeHandler}
              value={credentials.password}
            />
          </label>
        </p>

        <ButtonContainer className="button-modal" onClick={login}>
          Login!
        </ButtonContainer>
        <p className="forgotText">Forgot username or password? <a href="/">Click here.</a></p>
      </form>
    </div>
  );
};

export default withRouter(Login);