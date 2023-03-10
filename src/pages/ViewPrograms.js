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
        <div className="program_table_div">
          <h2>Click on a training program to view it</h2>
          <div>
            <table className="program_table">
              <thead>
                <tr>
                  <td className="tableHeader">
                    <h3 className="HeaderText">Programs</h3>
                  </td>
                  <td className="tableHeader">
                    <h3 className="HeaderText">Week:</h3>
                  </td>
                </tr>
              </thead>
              <tbody>
                {trainingPrograms.map((program) => (
                  <tr>
                    <button
                      onClick={() => setUserPrograms(program)}
                      className="training-submit"
                    >
                      <td>{program.title}</td>
                      <td text-align="center">{program.week}</td>
                    </button>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <br></br>
          {userPrograms ? (
            <div>
              <h2 className="viewprogram-title">{userPrograms.title}:</h2>
              <div className="Modified DayTable">
                <table className="program_table">
                  <thead>
                    <tr>
                      {userPrograms.trainingDays.map((trainingDay) => (
                        <td className="tableHeader">
                          <h3 className="HeaderText">{trainingDay.name}</h3>
                        </td>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      {userPrograms.trainingDays.map((trainingDay) => (
                        <td>
                          <div className="Unmodified DayTable">
                            <table className="program_table">
                              <thead className="SubtableHead">
                                <tr>
                                  <td>
                                    <h4 className="HeaderText">Name</h4>
                                  </td>
                                  <td>
                                    <h4 className="HeaderText">Sets</h4>
                                  </td>
                                  <td>
                                    <h4 className="HeaderText">Reps</h4>
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
