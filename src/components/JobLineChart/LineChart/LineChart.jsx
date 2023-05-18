import s from "./style.module.css";
import { Line } from "react-chartjs-2";
import {
  Chart as chartjs,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
chartjs.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);
export default function LineChart({ dataLabels, dataValues }) {
  const data = {
    labels: dataLabels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          return getGradient(ctx, chartArea);
        },
        borderColor: 'red',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  function getGradient(ctx, chartArea) {
    const gradientBg = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );
    gradientBg.addColorStop(0, "rgb(31,36,39)");
    gradientBg.addColorStop(1, "lightblue");
    return gradientBg;
  }

  const options = {
    plugins: {
      legend: {
        display: false, // hide the legend
      },
      tooltip: {
        callbacks: {
          title: () => "",
          label: (context) => {
            return `${context.parsed.y} job postings`;
          },
        },
        titleFontColor: "transparent", // set title font color to transparent
        displayColors: false, // hide color box
        pointStyle: "none", // remove point style
        borderWidth: 1, // set border width for tooltip
        borderColor: "rgba(0,0,0,0.8)", // set border color for tooltip
        backgroundColor: "rgba(255,255,255,0.8)",
        bodyColor: "black",
      },
    },
    scales: {
      y: {
        border: {
          display: false,
        },
        ticks: {
          align: "start",
          // For a category axis, the val is the index so the lookup via getLabelForValue is needed
          callback: function (val, index) {
            // Hide every 2nd tick label
            return index % 2 === 0 ? this.getLabelForValue(val) : "";
          },
        },
        grid: {
          drawTicks: true,
          tickColor: "black",
          tickLength: 5,
          tickWidth: 1,
        },
        lineWidth: 0,
      },
      x: {
        border: {
          width: 1,
          color: "black",
        },
        ticks: {
          align: "center",
          callback: function (val, index) {
            // Hide every 2nd tick label
            return index % 2 === 0 ? this.getLabelForValue(val) : "";
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0)",
          drawTicks: true,
          tickColor: "black",
          tickLength: 5,
          tickWidth: 1,
        },
      },
    },
  };

  return (
    <div className={s.container}>
      Number of job postings
      <Line data={data} options={options}></Line>
    </div>
  );
}
