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
          <div>
              <div>
                {trainingPrograms.map((program) => (
                    <button onClick={() => setUserPrograms(program)} className="select-program">{program.title}</button>
                ))}
              </div>
          </div>

          <br></br>
          {userPrograms ? (
            <div>
              <h2 className="viewprogram-title">{userPrograms.title}:</h2>
              <div>
                <table className="program-table">
                  <thead>
                    <tr>
                      {userPrograms.trainingDays.map((trainingDay) => (
                        <td>
                          <h3>{trainingDay.name}</h3>
                        </td>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      {userPrograms.trainingDays.map((trainingDay) => (
                        <td>
                          <div>
                            <table className="program-table">
                              <thead>
                                <tr>
                                  <td>
                                    <h4>Name</h4>
                                  </td>
                                  <td>
                                    <h4>Sets</h4>
                                  </td>
                                  <td>
                                    <h4>Reps</h4>
                                  </td>
                                </tr>
                              </thead>
                              <tbody>
                                {trainingDay.exercises.map((exercise) => (
                                  <tr>
                                    <td>{exercise.name}</td>
                                    <td>{exercise.sets}</td>
                                    <td>{exercise.reps}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <br></br>
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
