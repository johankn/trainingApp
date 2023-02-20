import TrainingDay from "../components/TrainingDay";
import {useNavigate} from "react-router-dom";


function MakeProgram({isAuth}){

  const navigate = useNavigate();

  const toLogin = () => {
    navigate("/");
  }

  if (isAuth) {
    return(
        <div>
            <TrainingDay/>
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

export default MakeProgram;