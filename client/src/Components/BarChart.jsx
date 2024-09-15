import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale
);

const BarChart = ({ sold, title }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "x",
    plugins: {
      legend: {
        display: false, // Hide legend to keep it simple
      },
      title: {
        display: true,
        text: "Units Sold per Product", // Chart title
        color: "#333",
        font: {
          size: 20, // Set title font size
        },
        padding: {
          top: 20,
          bottom: 30,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Units Sold: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false, // Hide the y-axis grid lines
        },
        ticks: {
          color: "#555", // Color for y-axis labels
          font: {
            size: 12, // Y-axis label font size
          },
        },
      },
      x: {
        grid: {
          display: false, // Hide the x-axis grid lines
        },
        ticks: {
          color: "#555", // Color for x-axis labels
          font: {
            size: 12, // X-axis label font size
          },
        },
      },
    },
  };

  const data = {
    labels: title,
    datasets: [
      {
        label: "Units Sold",
        data: sold,
        backgroundColor: "rgba(65, 105, 225, 0.8)", // Soft blue color
        borderColor: "rgba(65, 105, 225, 1)",
        borderWidth: 1,
        barThickness: 40, // Standard bar thickness
        barPercentage: 0.8,
        categoryPercentage: 0.6,
      },
    ],
  };

  return (
    <div className="h-96 w-full p-6">
      <Bar  options={options} data={data} />
    </div>
  );
};

export default BarChart;
