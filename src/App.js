import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import MainPage from "./pages/MainPage";
import MakeProgram from "./pages/MakeProgram";
import ProfilePage from "./pages/ProfilePage";
import ViewPrograms from "./pages/ViewPrograms";
import ProgressionChart from "./pages/ProgressionChart";
import { useState } from "react";
import "./resources/app.css";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

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

  return (
    <Router>
      <nav className="nav">
        <img onClick={toMainPage} src="./image.png" alt="Logo" className="nav-logo" />
        <ul className="nav-items">
          <li>Create Programs</li>
          <li>View Programs</li>
          <li>See Progression</li>
        </ul>
        <a onClick={goToProfile} className="Profile">
            <img
              src="./profile-icon.png"
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
        <Route path="/profile" element={!isAuth ? (<Login/>) : (<ProfilePage setIsAuth={setIsAuth}/> )} loader={goToProfile}/>
        <Route path="/makeprogram" element={<MakeProgram isAuth={isAuth} />} />
        <Route path="/viewprograms" element={<ViewPrograms isAuth={isAuth} />} />

        {/* TODO authentication */}
        <Route path="/progressionchart" element={<ProgressionChart />} />
      </Routes>
    </Router>
  );
}

export default App;
