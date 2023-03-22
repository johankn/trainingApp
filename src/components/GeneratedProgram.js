import React, { useState, useEffect } from "react";
import "../resources/generatedProgram.css";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase-config";
import ChooseProgramCarousel from "../components/ChooseProgramCarousel";
import DisplayPrograms from "../components/DisplayPrograms";
import {
  addDoc,
  getDocs,
  collection,
  deleteDoc,
  doc,
  where,
  query,
} from "firebase/firestore";

function GeneratedProgram() {
  const [trainingGoals] = useState([
    { name: "Back & Biceps" },
    { name: "Chest, shoulders & triceps" },
    { name: "Quads & calves" },
    { name: "Glutes & hamstrings" },
    { name: "Abs"},
  ]);

  const [currentGoalIndex, setCurrentGoalIndex] = useState(0);

  
  const [title, setTitle] = useState("");
  const [week, setWeek] = useState("");

  const handleSelectDay = (goalIndex) => {
    console.log(goalIndex)
    console.log(trainingPrograms[goalIndex])
    setCurrentGoalIndex(goalIndex);
  };

  const navigate = useNavigate();

  const [trainingPrograms, setTrainingPrograms] = useState([]);
  const [userPrograms, setUserPrograms] = useState();
  const trainingProgramsCollectionRef = collection(db, "trainingPrograms");

  const getPrograms = async () => {
    try {
      const data = await getDocs(trainingProgramsCollectionRef);
      const programs = data.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        let filteredPrograms = [];

        for (let i = 0; i < trainingGoals.length; i++) {
          const goal = trainingGoals[i];
          const goalPrograms = programs.filter(
            (program) => program.author.id === goal.name
          );
          filteredPrograms = filteredPrograms.concat(goalPrograms);
        }
    
        setTrainingPrograms(filteredPrograms);
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("Effect called");
    getPrograms();
  }, []);

  const makeProgram = async () => {
    if (title === "") {
      alert("You must set a title for the training program.");
      return;
    }

    const trainingDays = trainingPrograms[currentGoalIndex].trainingDays
    addDoc(trainingProgramsCollectionRef, {
      title,
      week,
      trainingDays,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/mainpage");
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
        <br></br>
        <label className="trainingday-title"> Program Title:</label>
        <br></br>
        <input
          type="text"
          name="name"
          className="program-field"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br></br>
        <label className="program-title"> Week:</label>
        <br></br>
        <input
          type="number"
          name="week"
          className="week-field"
          onChange={(e) => setWeek(e.target.value)}
        />
        <br></br>
        <button onClick={makeProgram} className="training-submit">
          Save Program
        </button>
        {trainingPrograms[currentGoalIndex] ? (            
            <DisplayPrograms userPrograms={trainingPrograms[currentGoalIndex]} />
          ) : (
            <h2>No program has been selected yet</h2>
          )}
        <form className="training-form">
          <br></br>
        </form>     
      </div>
    </div>
  );
}

export default GeneratedProgram;