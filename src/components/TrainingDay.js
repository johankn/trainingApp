import React, { useState } from "react";
import "../resources/trainingDay.css";

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

  const [newExercise, setNewExercise] = useState({
    name: "",
    sets: "",
    reps: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewExercise({ ...newExercise, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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

  return (
    <div className="App">
      <div className="center">
        <h2>Training Program</h2>
        <h3>{trainingDays[currentDayIndex].name}</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Exercise Name:
            <input
              type="text"
              name="name"
              value={newExercise.name}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Sets:
            <input
              type="number"
              name="sets"
              value={newExercise.sets}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Reps:
            <input
              type="number"
              name="reps"
              value={newExercise.reps}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit">Add Exercise</button>
        </form>
        <div className="left">{exerciseList}</div>
        <div className="day-selector">
          {trainingDays.map((day, index) => (
            <button
              key={index}
              onClick={() => handleSelectDay(index)}
              className={index === currentDayIndex ? "active" : ""}
            >
              {day.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrainingProgram;
