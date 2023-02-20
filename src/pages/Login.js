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
    <form>
      <label> Email </label>
      <input
        type="email"
        id="email"
        className="form__input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      ></input>
      <label> Password </label>
      <input
        className="form__input"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      ></input>
      <input onClick={onLogin} type="button" value="Login"></input>
      <input onClick={toRegistration} type="submit" value="New user? Register here"></input>

    </form>
  );
}

export default Login;

