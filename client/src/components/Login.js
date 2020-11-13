import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialLoginValues = {
  credentials: {
    username: '',
    password: ''
  }
};

const Login = () => {
  const [state, setState] = useState(initialLoginValues);

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  
  const history = useHistory();

  const handleChange = (e) => {
    setState({
      ...state,
      credentials: {
        ...state.credentials,
        [e.target.name]: e.target.value
      }
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/login', state.credentials)
      .then(res => {
        window.localStorage.setItem('token', res.data.payload)
        history.push('/bubblepage')
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input 
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={state.username}
          />
          <input 
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={state.password}
          />
          <button type="submit">Log In</button>
        </form>
      </div>
    </>
  );
};

export default Login;
