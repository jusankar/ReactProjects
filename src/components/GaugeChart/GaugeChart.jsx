import s from "./style.module.css";
import React from "react";

export default function GaugeChart() {
  return (
    <div className={s.container}>
      <svg viewBox="-10 -5 120 50" height={300} width={300}>
        <path
          d="M0,25 a50,50 0 1,1 100,0"
          stroke="blue"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M0,25 a50,50 0 1,1 100,0"
          stroke="red"
          strokeWidth="1.5"
          fill="none"
          style={{ strokeDasharray: "200", strokeDashoffset: "200" }}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="200"
            to="50"
            dur="2s"
            fill="freeze"
          />
        </path>
        <circle cx="0" cy="0" r="2" fill="red">
        <animateMotion
            dur="2s"
            rotate="auto"
            repeatCount="1"
            path="M0,25 a50,50 0 1,1 100,0"
            begin="0s"
            fill="freeze"
            keyPoints="0;0.95"
            keyTimes="0;1"
            pathLength="200"
          />
        </circle>
      </svg>
    </div>
  );
}
