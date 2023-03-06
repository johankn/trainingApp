import "../resources/progressionChart.css";
import {BarChart, Bar,Cell, LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend} from "recharts";
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

  const progressionData = [
    { name: 'Week 1', weight: 20, reps: 10,daysTrained: 4},
    { name: 'Week 2', weight: 40, reps: 20,daysTrained: 2},
    { name: 'Week 3', weight: 60, reps: 10,daysTrained: 5},
    { name: 'Week 4', weight: 80, reps: 20,daysTrained: 4},
    { name: 'Week 5', weight: 100,reps: 30,daysTrained: 7},
  ];
  
function ProgressionChart(){
    return(
      <div className="progressionChartMainPage">
        <div className="lineChart">
          <div className="chartTitle">Your Progression</div>
          <LineChart width={1000} height={500} data={progressionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }}/>
              <Line type="monotone" dataKey="reps" stroke="#82ca9d" activeDot={{ r: 8 }}/>
          </LineChart>
        </div>
        <div className="barChart">
          <div className="chartTitle">Workout's per week</div>
          <BarChart width={1000} height={500} data={progressionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="daysTrained" fill="#82ca9d"/>
          </BarChart>
        </div>
      </div>
  )
}

export default ProgressionChart