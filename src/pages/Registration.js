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
      <label> Username </label>
      <input
        type="Username"
        id="Username"
        className="form__input"
        placeholder="Username"
      ></input>
      <label> Email </label>
      <input
        type="email"
        id="email"
        className="form__input"
        placeholder="Email"
      ></input>
      <label> Password </label>
      <input
        className="form__input"
        type="password"
        id="password"
        placeholder="Password"
      ></input>
            {/* <label> Confirm password </label>
      <input
        className="form__input"
        type="Confirm password"
        id="Confirm password"
        placeholder="Confirm password"
      ></input> */}
      <input type="submit" value="Register"></input>
    </form>
  );
}

export default Registration;