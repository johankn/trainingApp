import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Login from './pages/Login';
import MainPage from "./pages/MainPage";
import { useState } from "react";
import { auth } from "./firebase-config";

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <Router> 
      <Routes>
        <Route path="/mainpage" element={<MainPage setIsAuth={setIsAuth}/>} />
        <Route path="/" element={<Login setIsAuth={setIsAuth}/>} />
      </Routes>
    </Router>
  );
}

export default App;