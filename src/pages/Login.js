import React, { useState } from "react";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../resources/login.css";
import Navbar from "../components/Navbar";

function Login({ setIsAuth }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        //setIsAuth(true);
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <form>
      <Navbar />
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
      <input onClick={onLogin} type="submit" value="Login"></input>
    </form>
  );
}

export default Login;
