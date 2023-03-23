import TrainingDay from "../components/TrainingDay";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import GeneratedProgram from "../components/GeneratedProgram";
import "../resources/makeProgram.css"


function MakeProgram({ currentProgram, setcurrentProgram, isAuth }) {
  const navigate = useNavigate();

  const toLogin = () => {
    navigate("/");
  };

  const [selectedButton, setSelectedButton] = useState(null);

  const handleMakeOwnProgramClick = () => {
    setSelectedButton("makeOwnProgram");
  };

  const handleGenerateProgramClick = () => {
    setSelectedButton("generateProgram");
  };


  return (
    <div>
      {(selectedButton || currentProgram) ? (
        (selectedButton === "makeOwnProgram" || currentProgram) ? (
          <TrainingDay
            currentProgram={currentProgram}
            setcurrentProgram={setcurrentProgram}
          />
        ) : (
          <GeneratedProgram />
        )
      ) : (
        <>
          <button
            className="select-program"
            onClick={handleMakeOwnProgramClick}
          >
            Make own program
          </button>
          <button
            className="select-program"
            onClick={handleGenerateProgramClick}
          >
            Generate program
          </button>
        </>
      )}
      {!selectedButton && !isAuth && (
        <div>
          <p>You need to be logged in to make a program.</p>
          <input onClick={toLogin} type="button" value="Login here"></input>
        </div>
      )}
    </div>
  );
}

export default MakeProgram;
