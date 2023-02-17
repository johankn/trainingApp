import React, { useState } from "react";
import { auth } from "../firebase-config";
import Navbar from "../components/Navbar";
import "../resources/Registration.css"


function Registration({ setIsAuth }) {
  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);

  // const onRegistration = (e) => {
  //   e.preventDefault();
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       //setIsAuth(true);
  //       console.log(user);
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorCode, errorMessage);
  //     });
  // };

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
              placeholder="Username"
            ></input>
          </div>
          
          <div className="SingleRegistrationField">
            <label> Email </label>
            <input
              type="email"
              id="email"
              className="form__input"
              placeholder="Email"
            ></input>
          </div>

          <div className="SingleRegistrationField">
            <label> Password </label>
            <input
              className="form__input"
              type="password"
              id="password"
              placeholder="Password"
            ></input>
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
              <input type="submit" value="Register" className="RegisterButton"></input>
            </center> 
          </div>
        </div>

        <div className="CommercialField">
          <img src= "./profile.gif" alt = "Profile-Placeholder" />
        </div>
      </div>
    </form>
  );
}

export default Registration;