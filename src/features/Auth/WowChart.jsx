import { Chart, Colors } from "chart.js";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
} from "chart.js";

import { Radar } from "react-chartjs-2";
ChartJS.register(
  LineElement,
  Colors,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler
);

const WowChart = () => {
  const data = {
    labels: [
      "FINANCE",
      "CAREER",
      "EDUCATION",
      "HEALTH",
      "PHYSICAL ACTIVITY",
      "HOME COOKING",
      "HOME ENVIRONMENTS",
      "RELATIONSHIPS",
      "SOCIAL LIFE",
      "JOY",
      "SPIRITUALITY",
      "CREATIVITY",
    ],
    datasets: [
      {
        label: "Wheel of welness",
        data: [100, 100, 100, 50, 100, 100, 100, 100, 100, 100, 100, 100], // Example data
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Background color
        borderColor: "red", // Border color
        borderWidth: 1, // Border width,
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
        fill: true,
        pointRadius: 10,
        borderJoinStyle:'miter' 
      },
    ],
  };

  return <Radar style={{ width: "600px" }} data={data}></Radar>;
};

export default WowChart;
