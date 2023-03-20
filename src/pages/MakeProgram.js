import TrainingDay from "../components/TrainingDay";
import {useNavigate} from "react-router-dom";
import { useState } from "react";


function MakeProgram({currentProgram, setcurrentProgram, isAuth}){

  const navigate = useNavigate();

  const toLogin = () => {
    navigate("/");
  }


  if (isAuth) {
      return(
        <div>
          <TrainingDay currentProgram={currentProgram} setcurrentProgram={setcurrentProgram}/>
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