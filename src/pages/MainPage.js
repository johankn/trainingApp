import Navbar from "../components/Navbar";
import "../resources/mainPage.css";

function myfunc() {
    console.log("test")
}


function mainPage(){
    return(
        <div className="button-parent">
            <Navbar/>
            <p className="header">Train With Me</p>
            <input type="button" className="make-program" value = "Create Training Programs" onClick={myfunc}></input>
            <input type="button" className="make-program" value = "View Training Programs"></input>
        </div>
    )
}

export default mainPage;