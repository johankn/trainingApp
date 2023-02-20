import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import MainPage from "./pages/MainPage";
import MakeProgram from "./pages/MakeProgram";
import { useState } from "react";
import { auth } from "./firebase-config";
import { signOut } from "firebase/auth";
import "./resources/app.css";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };

  return (
    <Router>
      <nav className="nav">
        <img src="./logo192.png" alt="Logo" className="nav-logo" />
        <ul className="nav-items">
          <li>
            {" "}
            {!isAuth ? (
              <Link to="/">Login</Link>
            ) : (
              <button onClick={signUserOut}>Log out</button>
            )}
          </li>
        </ul>
        <div className="Profile">
          <img
            src="./profile.gif"
            alt="Profile-Placeholder"
            className="profile-placeholder"
          />
        </div>
      </nav>
      <Routes>
        <Route path="/mainpage" element={<MainPage setIsAuth={setIsAuth} />} />
        <Route path="/" element={<Login setIsAuth={setIsAuth} />} />
        <Route
          path="/registration"
          element={<Registration isAuth={isAuth} />}
        />
        <Route path="/makeprogram" element={<MakeProgram isAuth={isAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
