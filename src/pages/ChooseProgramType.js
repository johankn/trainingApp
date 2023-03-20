import {useNavigate} from "react-router-dom";
import "../resources/chooseProgramType.css";

function ChooseProgramType(isAuth) {

    const navigate = useNavigate();

    const routeChange = () =>{ 
        let path = `/GeneratedProgram`; 
        navigate(path);
      }
    
      const routeChange2 = () =>{ 
        let path = `/MakeProgram`; 
        navigate(path);
      }

      const toLogin = () => {
        navigate("/");
      }

      if (isAuth) {
        return(
            <div className="main-page">
            <h2 className="choose-program-title">Choose between a premade training program or customize your own</h2>
            <button onClick={routeChange2} className="ownProgram">
              Create you own training program
            </button>
            <button onClick={routeChange} className="generatedProgram">
              Choose a trainingprogram for you goal
            </button>
          </div>
        )
    }
    else {
      return(
        <div>
          <p>
            You need to be logged in to make a program. 
          </p>
          <input onClick={toLogin} type="button" value="Login here"></input>
        </div>
      )
    }

}

export default ChooseProgramType;