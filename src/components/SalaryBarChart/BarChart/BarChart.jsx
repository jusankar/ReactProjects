import s from "./style.module.css";
import {
  Chart as ChartJS2,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS2.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarChart({ dataLabels, dataValues }) {
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
        borderWidth: 1,
        hoverBackgroundColor: "rgba(37, 37, 37, 0.8)",
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
    gradientBg.addColorStop(0.4, "rgb(37,37,37)");
    gradientBg.addColorStop(1, "lightblue");
    return gradientBg;
  }

  const barPattern = {
    id: "barPattern",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const {
        ctx,
        chartArea: { top, height },
        scales: { x},
      } = chart; // use object destructuring to extract necessary properties
      ctx.save();
      const width = chart.getDatasetMeta(0).data[0].width;
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      chart.getDatasetMeta(0).data.forEach((dataPoint, index) => {
        ctx.fillRect(
          x.getPixelForValue(index) - width / 2,
          top,
          width,
          height - 0.5
        );
      });
    },
  };

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
          width: 1,
          color: "black",
        },
        ticks: {
          align: "start",
        },
        grid: {
          color: "rgba(0, 0, 0, 0)",
          drawTicks: true,
          tickColor: "black",
          tickLength: 5,
          tickWidth: 1,
        },
        lineWidth: 2,
        color: "black",
      },
      x: {
        border: {
          width: 1,
          color: "black",
        },
        ticks: {
          align: "center",
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
      Job postings
      <Bar data={data} options={options} plugins={[barPattern]} />
    </div>
  );
}
