import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Login from './pages/Login';
import Registration from './pages/Registration';

import { useState } from "react";
import { auth } from "./firebase-config";

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <Router> 
      <Routes>
        <Route path="/mainpage" element={<MainPage setIsAuth={setIsAuth}/>} />
        <Route path="/" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path="/registration" element={<Registration isAuth={isAuth}/>} />

      </Routes>
    </Router>
  );
}

export default App;