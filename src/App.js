import React, { useState } from "react";
import "./App.css";
import Axios from "axios";

const App = () => {
  const [usernameReg, setUsernameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [registrationnoReg, setRegistrationNo] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const register = () => {
    //Axios helps make HTTP request to HTTP servers
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      email: emailReg,
      registrationno: registrationnoReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
  };

  //using state to get the username and password

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  //sending HTTP requests to "/login" endpoint using Axios

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (!response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].message);
      }
    });
  };

  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <br />
        <label>Email</label>
        <input
          type="text"
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        />
        <br />
        <label>Registrtation.No</label>
        <input
          type="text"
          onChange={(e) => {
            setRegistrationNo(e.target.value);
          }}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />{" "}
        <br />
        {/* using onClick attribute to connect the click events to the function register making use of the Axios module to initiate the POST requests */}
        <button onClick={register}>Register</button>
      </div>
      <div className="login">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={login}>Login</button>
      </div>
      <h1> {loginStatus}</h1>
    </div>
  );
};

export default App;
