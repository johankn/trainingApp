import React, { useState } from "react";

function ChooseProgramCarousel({ trainingPrograms, setUserPrograms }) {
  return (
    <div className="choose-program-container">
      {trainingPrograms
        .sort((a, b) => a.week - b.week)
        .map((program) => (
          <div
            className="choose-program-card"
            onClick={() => setUserPrograms(program)}
          >
            <div>
              <h2 className="choose-program-title">{program.title}</h2>
              <p className="choose-program-week">Week {program.week}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ChooseProgramCarousel;
