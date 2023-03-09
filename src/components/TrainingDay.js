import React, { useState } from "react";
import "../resources/trainingDay.css";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";

function TrainingProgram() {
  const [trainingDays, setTrainingDays] = useState([
    { name: "Monday", exercises: [] },
    { name: "Tuesday", exercises: [] },
    { name: "Wednesday", exercises: [] },
    { name: "Thursday", exercises: [] },
    { name: "Friday", exercises: [] },
    { name: "Saturday", exercises: [] },
    { name: "Sunday", exercises: [] },
  ]);

  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  const [title, setTitle] = useState("");
  const [week, setWeek] = useState("");

  const [newExercise, setNewExercise] = useState({
    name: "",
    sets: "",
    reps: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewExercise({ ...newExercise, [name]: value });
  };

  const handleDropdownChange = () => {
    const selectElement = document.querySelector('#select1');
    const output = selectElement.options[selectElement.selectedIndex].value;

    setNewExercise({ ...newExercise, name: output });
  }

  const handleSubmit = (event) => {
 
    event.preventDefault();

    console.log(newExercise.name);
    // Check if any input fields are empty
    if (!newExercise.name || !newExercise.sets || !newExercise.reps) {
      return;
    }
    const id = trainingDays[currentDayIndex].exercises.length + 1;

    const exercise = { id, ...newExercise };
    const updatedTrainingDays = [...trainingDays];
    updatedTrainingDays[currentDayIndex].exercises.push(exercise);
    setTrainingDays(updatedTrainingDays);
    setNewExercise({ name: "", sets: "", reps: "" });
  };

  const handleDelete = (id) => {
    const updatedTrainingDays = [...trainingDays];
    updatedTrainingDays[currentDayIndex].exercises = updatedTrainingDays[
      currentDayIndex
    ].exercises.filter((exercise) => exercise.id !== id);
    setTrainingDays(updatedTrainingDays);
  };

  const exerciseList = trainingDays[currentDayIndex].exercises.map(
    (exercise) => (
      <div key={exercise.id}>
        <h3>{exercise.name}</h3>
        <p>{`Sets: ${exercise.sets} Reps: ${exercise.reps}`}</p>
        <button onClick={() => handleDelete(exercise.id)}>Delete</button>
      </div>
    )
  );

  const handleSelectDay = (dayIndex) => {
    setCurrentDayIndex(dayIndex);
  };

  const trainingProgramsCollectionRef = collection(db, "trainingPrograms");

  const navigate = useNavigate();

  const makeProgram = async () => {
    if (title === "") {
      alert("You must set a title for the training prgram.");
      return;
    }
    // try {
    addDoc(trainingProgramsCollectionRef, {
      title,
      week,
      trainingDays,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/mainpage");
    //  catch (error) {
    //   alert("Add at least one exercise to your program!");
    // }
  };

  return (
    <div className="main-page">
      <h2 className="training-title">Create Training Program</h2>
      <div>
        <div>
          {trainingDays.map((day, index) => (
            <button
              key={index}
              onClick={() => handleSelectDay(index)}
              className="select-day"
            >
              {day.name}
            </button>
          ))}
        </div>
        <br></br>
        <label className="program-title"> Program Title:</label>
        <br></br>
        <input
          type="text"
          name="name"
          className="program-field"
          onChange={(e) => setTitle(e.target.value)}
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
        <h3 className="current-day">{trainingDays[currentDayIndex].name}</h3>
        <form onSubmit={handleSubmit} className="training-form">
          <label> Exercise: </label>
          <div className="search-dropdown">
            <select id="select1" onChange={handleDropdownChange}>
              <option value="Squats">Squats</option>
              <option value="Push-Ups">Push-Ups</option>
              <option value="Bench Press">Bench Press</option>
              <option value="Sit-Ups">Sit-Ups</option>
              <option value="Bicep Curls">Bicep Curls</option>
              <option value="Shoulder Press">Shoulder Press</option>
              <option value="Pull-Ups">Pull-Ups</option>
            </select>
          </div>
          <br></br>
          <br></br>
          <label>Sets:</label>
          <br></br>
          <input
            type="number"
            name="sets"
            value={newExercise.sets}
            onChange={handleInputChange}
          />
          <br></br>
          <br></br>
          <label>Reps:</label>
          <br></br>
          <input
            type="number"
            name="reps"
            value={newExercise.reps}
            onChange={handleInputChange}
          />
          <br />
          <br></br>
          <button type="submit" className="training-submit">
            Add Exercise
          </button>
        </form>
        <button onClick={makeProgram} className="training-submit">
          Save Program
        </button>
        <div>{exerciseList}</div>
      </div>
    </div>
  );
}

export default TrainingProgram;
