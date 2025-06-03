import React, { useRef, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(BarElement, Tooltip, CategoryScale, LinearScale, Legend, Filler);

const Graph = ({ graphData }) => {
  // Prepare labels and data arrays
  const labels = graphData?.length
    ? graphData.map((item) => item.clickDate)
    : Array.from({ length: 7 }).map((_, i) => `Day ${i + 1}`);

  const dataValues = graphData?.length
    ? graphData.map((item) => item.count)
    : [2, 4, 3, 5, 6, 4, 7];

  // Chart.js data object
  const data = {
    labels,
    datasets: [
      {
        label: "Total Clicks",
        data: dataValues,
        backgroundColor: "rgba(59, 130, 246, 0.7)", // Tailwind blue-500 at 70% opacity
        borderColor: "#4f46e5", // Tailwind indigo-600
        borderWidth: 1,
        barThickness: 16,
        barPercentage: 0.6,
        categoryPercentage: 0.6,
      },
    ],
  };

  // Chart.js options object
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#1f2937", // Tailwind gray-800
          font: {
            family: "Inter, sans-serif",
            size: 14,
            weight: "500",
          },
        },
        position: "top",
      },
      tooltip: {
        padding: 8,
        titleFont: { family: "Inter, sans-serif", size: 14, weight: "600" },
        bodyFont: { family: "Inter, sans-serif", size: 13 },
        backgroundColor: "rgba(31, 41, 55, 0.9)", // Tailwind gray-800/90%
        titleColor: "#ffffff",
        bodyColor: "#f3f4f6", // Tailwind gray-100
        cornerRadius: 4,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#374151", // Tailwind gray-700
          font: {
            family: "Inter, sans-serif",
            size: 12,
          },
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        grid: {
          color: "rgba(229, 231, 235, 0.5)", // Tailwind gray-200/50%
        },
        title: {
          display: true,
          text: "Number of Clicks",
          color: "#374151", // Tailwind gray-700
          font: {
            family: "Inter, sans-serif",
            size: 14,
            weight: "600",
          },
        },
      },
      x: {
        ticks: {
          color: "#374151", // Tailwind gray-700
          font: {
            family: "Inter, sans-serif",
            size: 12,
          },
        },
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Date",
          color: "#374151", // Tailwind gray-700
          font: {
            family: "Inter, sans-serif",
            size: 14,
            weight: "600",
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-80 bg-white rounded-lg shadow-md p-4">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graph;
