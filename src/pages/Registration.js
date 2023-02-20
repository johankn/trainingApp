import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase-config";
import "../resources/Registration.css";

function Registration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState('');

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
        setErrorMessage(mapAuthCodeToMessage(error.code));
      });
  };

  function mapAuthCodeToMessage(authCode) {
    switch (authCode) {
      case "auth/invalid-password":
        return "Password provided is not corrected";

      case "auth/weak-password":
        return "The password needs to be at least 6 characters long";

      case "auth/invalid-email":
        return "Email provided is invalid";

      // Many more authCode mapping here...

      default:
        return "";
    }
  }

  return (
    <form>
      <div className="RegistrationPage">
        <div className="CommercialField">
          <img src="./profile.gif" alt="Profile-Placeholder" />
        </div>

        <div className="RegistrationFields">
          <div className="SingleRegistrationField">
            <h1>User registration</h1>
            <p></p>
          </div>

          <div className="SingleRegistrationField">
            <label> Username </label>
            <input
              type="Username"
              id="Username"
              className="form__input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            ></input>
          </div>

          <div className="SingleRegistrationField">
            <label> Email </label>
            <input
              type="email"
              id="email"
              className="form__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            ></input>
          </div>

          <div className="SingleRegistrationField">
            <label> Password </label>
            <input
              className="form__input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            ></input>
          </div>

          <div className="SingleRegistrationField">
            {errorMessage && <div className="error"> {errorMessage} </div>}
          </div>

          <input onClick={onRegister} type="submit" value="Register"></input>
        </div>
        <div className="CommercialField">
          <img src="./profile.gif" alt="Profile-Placeholder" />
        </div>
      </div>
    </form>
  );
}

export default Registration;
