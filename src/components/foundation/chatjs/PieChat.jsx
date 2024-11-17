import { Chart, registerables } from "chart.js";
import React, { useEffect, useRef } from "react";

Chart.register(...registerables);

const PieChart = ({ labels, datasets, title, tooltipCallbacks }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: datasets,
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "bottom" },
            title: {
              display: !!title,
              text: title,
            },
            tooltip: {
              callbacks: {
                ...tooltipCallbacks,
              },
            },
          },
        },
      });
    }
  }, [labels, datasets, title]);

  return <canvas ref={chartRef} width="400" height="100"></canvas>;
};

export default PieChart;
