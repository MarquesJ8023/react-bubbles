import React, { useState } from "react";
import axios from 'axios';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [values, setValues] = useState({username: '', password: ''});

  const updateValue = e => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  const submit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', values)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('userToken', res.data.payload);
        props.history.push('/bubble');
      })
      .catch(e => console.log(e));
  };

  return (
    <div>
      <form name='Login'>
        <input type='text' name='username' placeholder='Username' value={values.username} onChange={updateValue} />
        <input type='password' name='password' placeholder='Password' value={values.password} onChange={updateValue} />
        <button onClick={submit}>Login</button>
      </form>
    </div>
  );
};

export default Login;
