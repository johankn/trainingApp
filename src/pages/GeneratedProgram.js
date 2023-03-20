import React, { useState, useEffect } from "react";
import "../resources/generatedProgram.css";
import { useNavigate } from "react-router-dom";
import { addDoc, getDocs, getDoc, doc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import DisplayPrograms from "../components/DisplayPrograms";



function GeneratedProgram() {
  const [trainingDay] = useState([
    { name: "Back & Biceps" },
    { name: "Chest,shoulders & triceps" },
    { name: "Quads & calves" },
    { name: "Glutes & hamstrings" },
    { name: "Abs"},
  ]);

  const [currentGoalIndex, setCurrentGoalIndex] = useState(0);

  
  const [week, setWeek] = useState("");



  const handleSelectGoal = (goalIndex) => {
    setCurrentGoalIndex(goalIndex);
  };

  const trainingProgramsCollectionRef = collection(db, "trainingPrograms");

  const navigate = useNavigate();

  const makeProgram = async () => {
   
    // try {
    addDoc(trainingProgramsCollectionRef, {
      week,
      trainingDay,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/mainpage");
    //  catch (error) {
    //   alert("Add at least one exercise to your program!");
    // }
  };

  const [trainingPrograms, setTrainingPrograms] = useState([]);
  const [userPrograms, setUserPrograms] = useState();

  // const getPrograms = async () => {
  //   try {
  //     const data = await getDocs(trainingProgramsCollectionRef);
  //     const currentUser = auth.currentUser;
  //     console.log(currentUser.uid);
  //     const programs = data.docs
  //       .map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }))
  //       .filter((program) => program.author.id === "GenerateBack&biceps");
      
  //     setTrainingPrograms(programs);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  

  // useEffect(() => {
  //   console.log("Effect called");
  //   getPrograms();
  // }, []);

  const [program, setProgram] = useState();
  
  const fetchProgram = async () => {
    const postRef = doc(db, "trainingPrograms", "mMQHIHe3TNdxhdBUPrAK");
    const postDoc = await getDoc(postRef);
    if (postDoc.exists()) {
      setProgram(postDoc.data());
    }
  };

  useEffect(() => {
    console.log("Effect called");
    fetchProgram();
  }, []);

  
  return (
    <div className="main-page">
      <h2 className="training-title">Generate Training Program</h2>
      <div>
        <div>
          {trainingDay.map((goal, index) => (
            <button
              key={index}
              onClick={event => {
                handleSelectGoal(index);
                setUserPrograms(goal);
                }}
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
        <h3 className="current-goal">{trainingDay[currentGoalIndex].name}</h3>
        <form className="training-form">
          <br></br>
        </form>
        {program ? (            
            <DisplayPrograms userPrograms={program} />
          ) : (
            <h2>No program has been selected yet</h2>
          )}
        <button onClick={makeProgram} className="training-submit">
          Save Program
        </button>
        
      </div>
       
    </div>
  );
}

export default GeneratedProgram;