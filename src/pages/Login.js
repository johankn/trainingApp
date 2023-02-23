import React, { useState } from "react";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../resources/loginRegistration.css";
import {useNavigate} from "react-router-dom";

function Login({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState('');

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
        setErrorMessage(mapAuthCodeToMessage(error.code));
      });
  };

  function mapAuthCodeToMessage(authCode) {
    switch (authCode) {
      case "auth/wrong-password":
        return "Wrong password";
      case "auth/user-not-found":
        return "Email can not be found";
      case "auth/invalid-email":
        return "You need to input a valid email";

      // Many more authCode mapping here...

      default:
        return "";
    }
  }

  function print_error() {
    if (errorMessage != "") {
      return <div className="error"> {errorMessage} </div>;
    } else {
      return <div><br></br><br></br></div>;
    }
  }

  const navigate = useNavigate();

  const toRegistration = () => {
    navigate("/registration");
  }

  const toMainPage = () => {
    navigate("/mainpage");
  }

  return (
    <form className="main-page">
      <div className="center">
        <p className="title">Train With Me</p>
        <input
          type="email"
          id="email"
          className="submit-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        ></input>
        <br></br>
        <br></br>
        <input
          className="submit-field"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        ></input>

        <div>
          {print_error()}
        </div>

        <input onClick={onLogin} type="submit" value="Login" className="submit"></input>
        <br></br>
        <br></br>
        <br></br>
        <input onClick={toRegistration} type="submit" value="New user? Register here" className="submit"></input>
      </div>
    </form>
  );
}

export default Login;

