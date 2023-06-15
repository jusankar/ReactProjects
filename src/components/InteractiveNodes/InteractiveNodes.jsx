import React from "react";
import s from "./style.module.css";
import CircleBox from "./CircleBox/CircleBox";

export default function InteractiveNodes({ staff, management, executive }) {
  return (
    <div className={s.container}>
      <svg viewBox="0 0 800 650" className={s.viewBox}>
        {staff &&
          staff.map((itm, index) => {
            const y = 100 + index * 100;
            return (
              <g key={index}>
                <text
                  key={"ST" + itm.id}
                  x="150"
                  y="20"
                  textAnchor="middle"
                  fill="white"
                  textDecoration="underline"
                  fontSize={24}
                >
                  Staff
                </text>
                <CircleBox
                  key={"SC" + itm.id}
                  x={150}
                  y={y}
                  item={itm}
                  colNumber={1}
                ></CircleBox>
              </g>
            );
          })}
        {management &&
          management.map((itm, index) => {
            const y = 100 + index * 100;
            return (
              <g key={index}>
                <text
                  key={"MT" + itm.id}
                  x="400"
                  y="20"
                  textAnchor="middle"
                  fill="white"
                  textDecoration="underline"
                  fontSize={24}
                >
                  Management
                </text>
                <CircleBox
                  key={"MC" + itm.id}
                  x={400}
                  y={y}
                  item={itm}
                  colNumber={2}
                ></CircleBox>
              </g>
            );
          })}
        {executive &&
          executive.map((itm, index) => {
            const y = 70 + index * 100;
            return (
              <g key={index}>
                <text
                  key={"ET" + itm.id}
                  x="650"
                  y="20"
                  textAnchor="middle"
                  fill="white"
                  textDecoration="underline"
                  fontSize={24}
                >
                  Executive
                </text>
                <CircleBox
                  key={"EC" + itm.id}
                  x={650}
                  y={y}
                  item={itm}
                  colNumber={3}
                ></CircleBox>
              </g>
            );
          })}
      </svg>
    </div>
  );
}
