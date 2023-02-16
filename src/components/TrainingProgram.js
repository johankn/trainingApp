import React, { useState } from 'react';

function TrainingProgram() {
  const [exercises, setExercises] = useState([]);

  const [newExercise, setNewExercise] = useState({
    name: '',
    sets: '',
    reps: '',
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewExercise({ ...newExercise, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const id = exercises.length + 1;
    const exercise = { id, ...newExercise };
    setExercises([...exercises, exercise]);
    setNewExercise({ name: '', sets: '', reps: '' });
  };

  const exerciseList = exercises.map(exercise => (
    <div key={exercise.id}>
      <h3>{exercise.name}</h3>
      <p>{`Sets: ${exercise.sets} Reps: ${exercise.reps}`}</p>
    </div>
  ));

  return (
    <div>
      <h2>Training Program</h2>
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
      {exerciseList}
    </div>
  );
};

export default TrainingProgram;
