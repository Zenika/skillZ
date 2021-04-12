import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  BubbleController,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

const RadarChartJS = () => {
  const config = {
    type: "bubble",
    data: {
      datasets: [
        {
          label: "React",
          backgroundColor: "#F4C042",
          data: [{ x: 2, y: 3, r: 10 }],
        },
        {
          label: "Javascript",
          backgroundColor: "#F4C042",
          data: [{ x: 3, y: 4, r: 10 }],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "point",
      },
      plugins: {
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Compétence",
          },
          min: 1,
          max: 5,
          display: true,
          ticks: {
            display: true,
          },
        },
        y: {
          title: {
            display: true,
            text: "Appétence",
          },
          min: 1,
          max: 5,
          display: true,
          ticks: {
            display: true,
          },
        },
      },
    },
  };
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  Chart.register(BubbleController, LinearScale, PointElement, LineElement);
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, config as any);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default RadarChartJS;
