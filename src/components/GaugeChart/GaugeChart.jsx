import React, { useEffect, useState } from "react";
import s from "./style.module.css";

export default function GaugeChart({
  startValue = 100,
  pointedValue = 150,
  endValue = 200,
  size = 200,
  duration = 2,
}) {
  const [percentage, setPercentage] = useState(0);
  const [circumference, setCircumference] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const per = ((pointedValue - startValue) / (endValue - startValue)) * 100;
    const cir = 2 * Math.PI * 50; // Circumference of the circle
    const off = ((100 - per / 2) / 100) * cir; // Calculate the stroke offset
    setPercentage(per);
    setCircumference(cir);
    setOffset(off);
  }, [pointedValue, startValue, endValue]);

  useEffect(() => {
    const gaugeAnimationElement = document.getElementById("gauge-animation");
    gaugeAnimationElement.beginElement();
    const circleAnimationElement = document.getElementById("circle-animation");
    circleAnimationElement.beginElement();
  }, [pointedValue]);

  return (
    <div className={s.container}>
      <svg viewBox="-10 0 120 5" height={size} width={size * 2}>
        <g>
          {/* Blue Path */}
          <path
            d="M0,25 a50,50 0 1,1 100,0"
            stroke="rgb(30,75,185)"
            strokeWidth="1"
            fill="none"
          />

          {/* Red Path */}
          <path
            d="M0,25 a50,50 0 1,1 100,0"
            stroke="red"
            strokeWidth="1"
            fill="none"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference,
            }}
          >
            {/* Animation */}
            <animate
              id="gauge-animation"
              attributeName="stroke-dashoffset"
              from={circumference}
              to={offset}
              dur={duration}
              fill="freeze"
              key={pointedValue}
            />
          </path>

          {/* Red Circle at the Tip */}
          <circle cx="0" cy="0" r="2" fill="red">
            <animateMotion
              id="circle-animation"
              path="M0,25 a50,50 0 1,1 100,0"
              fill="freeze"
              dur={duration}
              keyPoints={`0; ${percentage / 100}`} // "0;0.25"
              keyTimes="0;1"
            />
          </circle>
          <text className={s.number} x={0} y={30}>
            {startValue}
          </text>
          <text className={s.pointNumber} x={40} y={10}>
            {pointedValue}
          </text>
          <text className={s.number} x={100} y={30}>
            {endValue}
          </text>
        </g>
      </svg>
    </div>
  );
}
