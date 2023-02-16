import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase-config";
import Navbar from "../components/Navbar";
import "../resources/Registration.css"


function Registration({ isAuth }) {

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

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
    })
  }

  return (
    <form>
      <Navbar />
      <div className="RegistrationPage">
        <div className="CommercialField">
          <img src= "./profile.gif" alt = "Profile-Placeholder" />
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
<<<<<<< HEAD
          </div>
          
          <div className="SingleRegistrationField">
            <label> Confirm password </label>
            <input
              className="form__input"
              type="Confirm password"
              id="Confirm password"
              placeholder="Confirm password"
            ></input>
          </div>

          <div className="SingleRegistrationField">
            <center>
              <input type="submit" value="Register" className="RegisterButton" onClick={onRegister}></input>
            </center> 
          </div>
        </div>

        <div className="CommercialField">
          <img src= "./profile.gif" alt = "Profile-Placeholder" />
        </div>
      </div>

=======
      <input onClick={onRegister} type="submit" value="Register"></input>
>>>>>>> 37164ef (added states for registration form, and firebase method createUserWithEmailAndPassword)
    </form>
  );
}

export default Registration;