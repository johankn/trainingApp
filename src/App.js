import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import MainPage from "./pages/MainPage";
import MakeProgram from "./pages/MakeProgram";
import ProfilePage from "./pages/ProfilePage";
import ViewPrograms from "./pages/ViewPrograms";
import ProgressionChart from "./pages/ProgressionChart";
import Friends from "./pages/Friends";
import { useState, useEffect } from "react";
import "./resources/app.css";
import { NavLink } from "react-router-dom";
import { auth } from "./firebase-config";
import GeneratedProgram from "./pages/GeneratedProgram";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [currentProgram, setcurrentProgram] = useState(null);
  const [url, setUrl] = useState("profile-icon.png");

  function goToProfile() {
    if (isAuth) {
      window.location.pathname = "/profile";
    } else {
      window.location.pathname = "/";
    }
  }

  const toMainPage = () => {
    if (isAuth) {
      window.location.pathname = "/mainpage";
    } else {
      window.location.pathname = "/";
    }
  }

  const toCreatePrograms = () => {
    if (isAuth) {
      window.location.pathname = "/MakeProgram";
    } else {
      window.location.pathname = "/";
    }
  }

  const toViewPrograms = () => {
    if (isAuth) {
      window.location.pathname = "/ViewPrograms";
    } else {
      window.location.pathname = "/";
    }
  }

  const toSeeProgression = () => {
    if (isAuth) {
      window.location.pathname = "/ProgressionChart";
    } else {
      window.location.pathname = "/";
    }
  }

  useEffect(() => {auth.onAuthStateChanged(user => {
    if (user) {
        if (auth.currentUser.photoURL) {
            setUrl(auth.currentUser.photoURL);
        }
        console.log(auth);
    }   
    })}, [])
  const toGenerateProgram = () => {
    if (isAuth) {
      window.location.pathname = "/GeneratedProgram";
    } else {
      window.location.pathname = "/";
    }
  }

  return (
    <Router>
      <nav className="nav">
        <img onClick={toMainPage} src="./image.png" alt="Logo" className="nav-logo" />
        <ul className="nav-items">
          <li onClick={toCreatePrograms}>Create Programs</li>
          <li onClick={toViewPrograms}>View Programs</li>
          <li onClick={toSeeProgression}>See Progression</li>
          <li onClick={toGenerateProgram}>Generate Training Program</li>
        </ul>
        <a onClick={goToProfile} className="Profile">
            <img
              src={url}
              alt="Profile-Placeholder"
              className="profile-placeholder"
            />
        </a>
      </nav>
      <Routes>
        <Route path="/mainpage" element={<MainPage setIsAuth={setIsAuth} />} />
        <Route path="/" element={<Login setIsAuth={setIsAuth} />} />
        <Route
          path="/registration"
          element={<Registration isAuth={isAuth} />}
        />
        <Route path="/profile" element={!isAuth ? (<Login/>) : (<ProfilePage url={url} setUrl={setUrl} setIsAuth={setIsAuth}/> )} loader={goToProfile}/>
        <Route path="/makeprogram" element={<MakeProgram currentProgram={currentProgram} setcurrentProgram={setcurrentProgram} isAuth={isAuth} />} />
        <Route path="/viewprograms" element={<ViewPrograms setcurrentProgram={setcurrentProgram} isAuth={isAuth} />} />
        <Route path="/GeneratedProgram" element={<GeneratedProgram isAuth={isAuth} />} />

        {/* TODO authentication */}
        <Route path="/progressionchart" element={<ProgressionChart />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
    </Router>
  );
}

export default App;
