import React, { useState } from "react";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../resources/login.css";
import {useNavigate} from "react-router-dom";

function Login({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setIsAuth(true);
        localStorage.setItem("isAuth", true);
        toMainPage();
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const navigate = useNavigate();

  const toRegistration = () => {
    navigate("/registration");
  }

  const toMainPage = () => {
    navigate("/mainpage");
  }

  return (
    <form className="login-page">
      <div className="center">
        <p className="title">Train With Me</p>
        <br></br>
        <br></br>
        <input
          type="email"
          id="email"
          className="login-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        ></input>
        <br></br>
        <br></br>
        <input
          className="login-field"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        ></input>
        <br></br>
        <br></br>
        <br></br>
        <input onClick={onLogin} type="button" value="Login" className="submit"></input>
        <br></br>
        <br></br>
        <br></br>
        <input onClick={toRegistration} type="submit" value="New user? Register here" className="submit"></input>
      </div>
    </form>
  );
}

export default Login;

