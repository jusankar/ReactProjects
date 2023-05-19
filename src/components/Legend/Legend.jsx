import s from "./style.module.css";
import * as d3 from "d3";

export default function Legend({title, minValue, maxValue, numIntervals, startColor, endColor }) {
  const intervalSize = Math.round((maxValue - minValue) / numIntervals);

  const scaleElements = [];
  for (let i = 0; i < numIntervals; i++) {
    const startValue = minValue + i * intervalSize;
    const endValue = startValue + intervalSize;
    const backgroundColor =  d3.interpolateRgb(
        startColor ? startColor : "rgba(183, 193, 198, 1)",
        endColor ? endColor : "rgba(73, 83, 88, 1)"
      )(i/numIntervals);

    // Pushing JSX elements to the scaleElements array
    scaleElements.push(
      <div className={s.circleContainer} key={i}>
        <div className={s.circle} style={{ backgroundColor }} />
        <span>{title==="Salary" && "$"}{startValue} - {title==="Salary" && "$"}{endValue}</span>
      </div>
    );
  }
  return (
    <div className={s.legendContainer}>
      <div className={s.title}>{title}</div>
      <div className={s.scaleContainer}>{scaleElements}</div>
    </div>
  );
}
