import { Chart, registerables } from "chart.js";
import React, { useEffect, useRef } from "react";

Chart.register(...registerables);

const BarChart = ({ datasets, labels }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: datasets.map((dataset) => ({
            label: dataset.label,
            data: dataset.data,
            backgroundColor: dataset.backgroundColor,
            borderColor: dataset.borderColor,
            borderWidth: dataset.borderWidth,
            yAxisID: dataset.yAxisID || "y",
          })),
        },
        options: {
          responsive: true,
          scales: {
            y: {
              position: "right",
              beginAtZero: true,
              grid: {
                display: false, // Tắt đường kẻ cho trục y
              },
            },
            y1: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              position: "bottom",
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [datasets, labels]);

  return <canvas ref={chartRef} width="400" height="100"></canvas>;
};

export default BarChart;
