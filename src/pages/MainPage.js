import "../resources/mainPage.css";
import {useNavigate} from "react-router-dom";
  

function MainPage(){
    const navigate = useNavigate();
    
    const toMakeProgram = () => {
        navigate("/makeprogram");
    }

    const toViewPrograms = () => {
      navigate("/viewprograms");
  }

    return(
        <div className="button-parent">
            <p className="mainpage-title">Train With Me</p>
            <input type="button" className="mainpage-button" value = "Create Training Programs" onClick={toMakeProgram}></input>
            <input type="button" className="mainpage-button" value = "View Training Programs" onClick={toViewPrograms}></input>
        </div>
    )
}

export default MainPage;