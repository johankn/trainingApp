import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  where,
  query,
} from "firebase/firestore";
import "../resources/viewPrograms.css";

function ViewPrograms({ isAuth }) {
  const navigate = useNavigate();

  const toLogin = () => {
    navigate("/");
  };

  const [trainingPrograms, setTrainingPrograms] = useState([]);
  const [userPrograms, setUserPrograms] = useState();
  const trainingProgramsCollectionRef = collection(db, "trainingPrograms");

  const getPrograms = async () => {
    try {
      const data = await getDocs(trainingProgramsCollectionRef);
      const currentUser = auth.currentUser;
      console.log(currentUser.uid);
      const programs = data.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((program) => program.author.id === currentUser.uid);
      
      setTrainingPrograms(programs);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("Effect called");
    getPrograms();
  }, []);

  return (
    <div>
      <h2 className="viewprogram-title">Your Training Programs</h2>
      {trainingPrograms.length > 0 ? (
        <div className="view-program-main-page">
          <h2>Click on a training program to view it</h2>
          <div className="choose-program-container">
            {trainingPrograms.sort((a, b) => a.week - b.week).map(program => (
                <div className="choose-program-card" onClick={() => setUserPrograms(program)}>
                  <div>
                      <h2 className="choose-program-title">{program.title}</h2>
                      <p className="choose-program-week">Week {program.week}</p>
                  </div>
                </div>
            ))}
          </div>
          {userPrograms ? (
            <div>
              <h2 className="viewprogram-title">{userPrograms.title}:</h2>
              <div className="display-program-container">
                {userPrograms.trainingDays.map((trainingDay) => (
                <div className="display-program-card">
                  <div>{trainingDay.name}</div>
                  <div>
                    {trainingDay.exercises.map((exercise) => (
                      <div>
                        <p>{exercise.name}</p>
                        <p> sets:{exercise.sets}</p>
                        <p> reps: {exercise.reps}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              </div>
            </div>
          ) : (
            <h2>No program has been selected yet</h2>
          )}
        </div>
      ) : (
        <p>No training programs found.</p>
      )}
    </div>
  );
}

export default ViewPrograms;
