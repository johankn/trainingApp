import React, { useState } from "react";
import { auth } from "../firebase-config";
import "../resources/profilepage.css";
import {useNavigate} from "react-router-dom";
import { updateProfile, updateEmail, updatePassword, signOut } from "firebase/auth";


function ProfilePage({ setIsAuth }){
    const [usernameNew, setUsernameNew] = useState("");
    const [emailNew, setEmailNew] = useState("");
    const [passwordNew, setPasswordNew] = useState("");

    const [emailNewCheck, setEmailNewCheck] = useState("");
    const [passwordNewCheck, setPasswordNewCheck] = useState("");

    const [actual_username, set_actual_username] = useState("");
    const [actual_mail, set_actual_mail] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [hasSaved, setHasSaved] = useState(false);

    const signUserOut = () => {
        signOut(auth).then(() => {
          localStorage.clear();
          setIsAuth(false);
          window.location.pathname = "/";
        });
      };

    // The following code updates the displayed username and email when the auth module has been loaded in
    React.useEffect(() => {auth.onAuthStateChanged(user => {
        if (user) {
            set_actual_username(auth.currentUser.displayName);
            set_actual_mail(auth.currentUser.email);
        }   
    })}, [])

    const saveChanges = (e) => {
        // This line ensures that the page is not reloaded: 
        e.preventDefault();
        setHasSaved(false);

        // This code changes the username:
         if (usernameNew !== "") {
            updateProfile(auth.currentUser, {displayName:usernameNew})
            .then(() => {
                set_actual_username(usernameNew);
                setUsernameNew("");
                setHasSaved(true);
            })
            .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                     setErrorMessage(error.message);
                     return;
                 });
         }

         // This code changes the email-address:
         if ((emailNew === emailNewCheck) && (emailNew !== "")) {
            updateEmail(auth.currentUser, emailNew)
            .then(() => {
                set_actual_mail(emailNew);
                setEmailNew("");
                setEmailNewCheck("");
                setHasSaved(true);
            })
            .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                     setErrorMessage(error.message);
                     return;
                 });
         }

         // This code changes the password:
         if ((passwordNew === passwordNewCheck) && (passwordNew !== "")) {
            updatePassword(auth.currentUser, passwordNew)
            .then(() => {
                    setPasswordNew("");
                    setPasswordNewCheck("");
                    setHasSaved(true);
                }
            )
            .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                     setErrorMessage(error.message);
                     return;
                 });
         }
        
         setErrorMessage("");
     };

     console.log(auth)

    return (
        <form>
          <div className="main-page">
            <p className="title"> User settings </p>

            

            <div>
                <h3> {actual_username ? (`Your current username is: ${actual_username} `) : ("No username has been chosen")} </h3>
                <input
                  type="Username"
                  id="Username"
                  className="submit-field"
                  value={usernameNew}
                  onChange={(e) => setUsernameNew(e.target.value)}
                  placeholder="New Username"
                ></input>
            </div>
            <br></br>
    
            <div>
                <h3> {`Your current email is: ${actual_mail}`} </h3>

                <input
                type="email"
                id="email"
                className="submit-field"
                value={emailNew}
                onChange={(e) => setEmailNew(e.target.value)}
                placeholder="New email"
                ></input>

                <input
                type="email"
                id="email"
                className="submit-field"
                value={emailNewCheck}
                onChange={(e) => setEmailNewCheck(e.target.value)}
                placeholder="Confirm new email"
                ></input>

                
            </div>
            
            <div>{(emailNew !== emailNewCheck) ? (<h3 className="errorMessage">The email addresses have to be equal!</h3> ) : (<div><br></br></div>)}</div>
            
            <div>
                <h3> Change password: </h3>
                <input
                className="submit-field"
                type="password"
                id="password"
                value={passwordNew}
                onChange={(e) => setPasswordNew(e.target.value)}
                placeholder="New password"
                ></input>

                <input
                className="submit-field"
                type="password"
                id="password"
                value={passwordNewCheck}
                onChange={(e) => setPasswordNewCheck(e.target.value)}
                placeholder="Confirm new password"
              ></input>
            </div>

            <div>{(passwordNew !== passwordNewCheck) ? (<h3 className="errorMessage">The passwords have to be equal!</h3> ) : (<div><br></br></div>)}</div> 
  
            <br></br>
            {(
                (usernameNew !== "") ||
                ((emailNew === emailNewCheck) && (emailNew !== "")) ||
                ((passwordNew === passwordNewCheck) && (passwordNew !== ""))
            ) ? (
                <button className="submit saveChanges" onClick={saveChanges}> Save changes </button>
            ) : (
                <button className="submit saveChangesInactive" onClick={saveChanges}> Save changes </button>
            )}
            <br></br>
            <button onClick={signUserOut} className="submit logout">Log out</button>
            <br></br>
            <div>
                {(errorMessage !== "") && <h3 className="errorMessage">{errorMessage}</h3>}
                {hasSaved && (errorMessage === "") && <h3 className="confirmationMessage"> Your changes have been saved! </h3>}
            </div>
            <br></br>
            <br></br>
          </div>
        </form>
    )
}

export default ProfilePage;