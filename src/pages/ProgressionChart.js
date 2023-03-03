import "../resources/progressionChart.css";
import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend} from "recharts";

  const progressionData = [
    { name: 'Week 1', weight: 20, reps:10 },
    { name: 'Week 2', weight: 40, reps:20},
    { name: 'Week 3', weight: 60, reps:10},
    { name: 'Week 4', weight: 80, reps:20},
    { name: 'Week 5', weight: 100,reps:30 },
  ];
  
function ProgressionChart(){
    return(
        <LineChart width={1000} height={500} data={progressionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }}/>
            <Line type="monotone" dataKey="reps" stroke="#82ca9d" activeDot={{ r: 8 }}/>
        </LineChart>
    )
}

export default ProgressionChart