import React, { useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerFood, setRegisterFood] = useState("");
  const [registerColor, setRegisterColor] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);
  const register = () => {
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
        food: registerFood,
        color: registerColor,
      },
      withCredentials: true,
      url: "https://alexqdev-login-authentication.herokuapp.com/register",
    }).then((res) => alert(res.data));
  };
  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "https://alexqdev-login-authentication.herokuapp.com/login",
    }).then((res) => alert(res.data));
  };
  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "https://alexqdev-login-authentication.herokuapp.com/user",
    }).then((res) => {
      if (!res.data) {
        alert("Please Sign In");
      } else {
        // console.log(res);
        setData(res.data);
      }
    });
  };
  return (
    <div className="App">
      <div className="container" id="nav">
        <ul>
          <li onClick={() => {
            document.getElementById('sign-up').classList.add('hide')
            document.getElementById('sign-up').classList.remove('visible')
            document.getElementById('sign-in').classList.toggle('hide')
            document.getElementById('sign-in').classList.toggle('visible')
          }}>Sign In</li>
          <li onClick={() => {
            document.getElementById('sign-in').classList.add('hide')
            document.getElementById('sign-in').classList.remove('visible')
            document.getElementById('sign-up').classList.toggle('hide')
            document.getElementById('sign-up').classList.toggle('visible')
          }}>Sign Up</li>
          <li>{data ? <h3>Hi, {data.username}</h3> : null}</li>
        </ul>
      </div>
      <div className="container hide" id="sign-up">
        <h3>Sign Up</h3>
        <input
          placeholder="Choose a Username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          placeholder="Choose a Password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <input
          placeholder="Your Favorite Food"
          onChange={(e) => setRegisterFood(e.target.value)}
        />
        <input
          placeholder="Your Favorite Color"
          onChange={(e) => setRegisterColor(e.target.value)}
        />
        <button className="btn btn-md btn-primary" onClick={register}>Sign Up</button>
      </div>

      <div className="container hide" id="sign-in">
        <h3>Sign In</h3>
        <input
          placeholder="Username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button className="btn btn-md btn-primary" onClick={login}>Sign In</button>
      </div>

      <div className="container" id="user-info">
        {data ? <h3>Your Favotite Food: {data.food}</h3> : null}
        {data ? <h3>Your Favotite Color: {data.color}</h3> : null}
        <button className="btn btn-md btn-primary" onClick={getUser}>View Current User</button>
      </div>
    </div>
  );
}

export default App;
