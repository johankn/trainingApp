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
import ChooseProgramCarousel from "../components/ChooseProgramCarousel";
import DisplayPrograms from "../components/DisplayPrograms";

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
      {trainingPrograms.length > 0 ? (
        <div className="view-program-main-page">
          <ChooseProgramCarousel
            trainingPrograms={trainingPrograms}
            setUserPrograms={setUserPrograms}
          />
          {userPrograms ? (
            <DisplayPrograms userPrograms={userPrograms} />
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
