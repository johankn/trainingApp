import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase-config";
import "../resources/loginRegistration.css";
function Registration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const update = {
          displayName: username,
        };
        updateProfile(user, update);
        window.location.pathname = "/";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <form>
      <div className="main-page">
        <p className="title"> Create New Account </p>

        <div>
            <input
              type="Username"
              id="Username"
              className="submit-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            ></input>
        </div>
        <br></br>

        <div>
          <input
            type="email"
            id="email"
            className="submit-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          ></input>
        </div>
        <br></br>

        <div>
          <input
            className="submit-field"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          ></input>
        </div>

        <br></br>
        <br></br>
        <input onClick={onRegister} type="submit" value="Register" className="submit"></input>
      </div>
    </form>
  );
}

export default Registration;
