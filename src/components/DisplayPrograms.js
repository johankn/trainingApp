import React from "react";

function DisplayPrograms({ userPrograms }) {
  return (
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
  );
}

export default DisplayPrograms;
