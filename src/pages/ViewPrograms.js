import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { getDocs, collection, deleteDoc, doc, where, query } from "firebase/firestore";

function ViewPrograms({ isAuth }) {
  const navigate = useNavigate();

  const toLogin = () => {
    navigate("/");
  };

  const [trainingPrograms, setTrainingPrograms] = useState([]);
  const [userPrograms, setUserPrograms] = useState([]);
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
      <h2>Your Training Programs</h2>
      {trainingPrograms.length > 0 ? (
        <ul>
        {trainingPrograms.map((program) => (
          <li key={program.id}>
            <h3>{program.title}</h3>
            <ul>
              {program.trainingDays.map((trainingDay) => (
                <li key={trainingDay.name}>
                  <h4>{trainingDay.name}</h4>
                  <ul>
                    {trainingDay.exercises.map((exercise) => (
                      <li key={exercise.name}>
                        <p>{exercise.name}</p>
                        <p>Sets: {exercise.sets}</p>
                        <p>Reps: {exercise.reps}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      ) : (
        <p>No training programs found.</p>
      )}
    </div>
  );
}

export default ViewPrograms;
