import React from 'react';
import "../resources/Navbar.css"
import {useNavigate} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const toLogin = () => {
    navigate("/");
  }

  const toMainpage = () => {
    navigate("/mainpage");
  }

    return (
      <div className="Navbar">
        <header>
          <nav className="nav">
            <a onClick={toMainpage} className="Clickable">
              <div className="Logo">
                  <img src= "./TrainingLogo.jpg" alt = "Hutao Smirc" className='logo-picture'/>
              </div>
            </a>
            {/* <ul className="nav-items">
              <li> Thing 1 </li>
              <li> Thing 2 </li>
              <li> Thing 3 </li>
            </ul> */}
            <a onClick={toLogin} className="Clickable">
              <div className="Profile">
                  <img src= "./profile.gif" alt = "Profile-Placeholder" className='profile-placeholder' />
              </div>
            </a>
          </nav>
        </header>
      </div>
    );
  }

  export default Navbar