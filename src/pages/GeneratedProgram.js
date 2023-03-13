import React, { useState } from "react";
import "../resources/generatedProgram.css";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";

function GeneratedProgram() {
  const [trainingGoals] = useState([
    { name: "Back & Biceps" },
    { name: "Chest,shoulders & triceps" },
    { name: "Quads & calves" },
    { name: "Glutes & hamstrings" },
    { name: "Abs"},
  ]);

  const [currentGoalIndex, setCurrentGoalIndex] = useState(0);

  
  const [week, setWeek] = useState("");



  const handleSelectDay = (goalIndex) => {
    setCurrentGoalIndex(goalIndex);
  };

  const trainingProgramsCollectionRef = collection(db, "trainingPrograms");

  const navigate = useNavigate();

  const makeProgram = async () => {
   
    // try {
    addDoc(trainingProgramsCollectionRef, {
      week,
      trainingGoals,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/mainpage");
    //  catch (error) {
    //   alert("Add at least one exercise to your program!");
    // }
  };

  return (
    <div className="main-page">
      <h2 className="training-title">Generate Training Program</h2>
      <div>
        <div>
          {trainingGoals.map((goal, index) => (
            <button
              key={index}
              onClick={() => handleSelectDay(index)}
              className="select-goal"
            >
              {goal.name}
            </button>
          ))}
        </div>
        <br></br>
        <br></br>
        <label className="program-title"> Week:</label>
        <br></br>
        <input
          type="number"
          name="week"
          className="week-field"
          onChange={(e) => setWeek(e.target.value)}
        />
        <h3 className="current-goal">{trainingGoals[currentGoalIndex].name}</h3>
        <form className="training-form">
          <br></br>
        </form>
        <button onClick={makeProgram} className="training-submit">
          Save Program
        </button>
        
      </div>
    </div>
  );
}

export default GeneratedProgram;