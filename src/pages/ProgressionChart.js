import "../resources/progressionChart.css";
import {
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
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

function ProgressionChart() {

  const exercisesMap = new Map([
    ["Arms", ["Bicep Curls"]],
    ["Chest", ["Push-Ups", "Bench Press"]],
    ["Legs", ["Squats"]],
    ["Abdominals", ["Sit-Ups"]],
    ["Shoulders", ["Shoulder Press"]],
    ["Back", ["Pull-Ups"]],
  ]);

  const calculateTotalReps = (bodyPart, week, programs) => {
    let totalReps = 0;
    programs.forEach((program) => {
      if (program.week === week) {
        program.trainingDays.forEach((day) => {
          day.exercises.forEach((exercise) => {
            if (exercisesMap.get(bodyPart).includes(exercise.name)) {
              totalReps += exercise.reps * exercise.sets;
            }
          });
        });
      }
    });
    return totalReps;
  };

  const [trainingPrograms, setTrainingPrograms] = useState([]);
  const trainingProgramsCollectionRef = collection(db, "trainingPrograms");

  const calculateDaysTrained = (week, programs) => {
    let daysTrained = 0;
    programs.forEach((program) => {
      if (program.week === week) {
        program.trainingDays.forEach((day) => {
          if (day.exercises.length !== 0) {
            daysTrained++;
          }
        });
      }
    });
    return daysTrained;
  };

  const getPrograms = async () => {
    try {
      const data = await getDocs(trainingProgramsCollectionRef);
      const currentUser = auth.currentUser;
      const programs = data.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((program) => program.author.id === currentUser.uid);

      // Extract the unique week numbers from the training programs
      const weeks = [
        ...new Set(programs.map((program) => program.week)),
      ].sort(function(a, b){return a - b});

      setTrainingPrograms(programs);
      setWeeks(weeks);

      // Create a new array of data objects with the correct structure
      const progressionData = weeks.map((week) => ({
        name: `Week ${week}`,
        Arms: calculateTotalReps("Arms", week, programs),
        Chest: calculateTotalReps("Chest", week, programs),
        Shoulders: calculateTotalReps("Shoulders", week, programs),
        Back: calculateTotalReps("Back", week, programs),
        Abdominals: calculateTotalReps("Abdominals", week, programs),
        Legs: calculateTotalReps("Legs", week, programs),
      }));

      setProgressionData(progressionData);
      
      const placeholderdata = weeks.map((week) => ({
        name: `Week ${week}`,
        DaysTrained: calculateDaysTrained(week, programs),
      }));

      setPlaceholderData(placeholderdata);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("Effect called");
    getPrograms();
  }, []);

  const [progressionData, setProgressionData] = useState([]);
  const [placeholderdata, setPlaceholderData] = useState([]);

  const [weeks, setWeeks] = useState([]);

  return (
    <div className="progressionChartMainPage">
      <div className="chartTitle">Reps per week per bodypart</div>
      <LineChart width={1000} height={500} data={progressionData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          label={{ value: "Total Reps", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Arms"
          stroke="#FFC100"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="Chest"
          stroke="#82ca9d"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="Shoulders"
          stroke="#82c"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="Back"
          stroke="#F000FF"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="Abdominals"
          stroke="#10E7E0"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="Legs"
          stroke="#D54729"
          activeDot={{ r: 8 }}
        />
      </LineChart>
      <div className="barChart">
        <div className="chartTitle">Days trained per week</div>
        <BarChart width={1000} height={500} data={placeholderdata}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            label={{
              value: "Days Trained",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="DaysTrained" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
}

export default ProgressionChart;
