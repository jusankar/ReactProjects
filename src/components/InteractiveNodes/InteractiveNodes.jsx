import React, { useEffect, useState } from "react";
import s from "./style.module.css";
import CircleBox from "./CircleBox/CircleBox";

export default function InteractiveNodes({ staff, management, executive }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Update the windowWidth state when the window is resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getColumnX = (colNumber) => {
    // Calculate the x position based on the screen width and column number
    const columnWidth = windowWidth / 3;
    return (colNumber - 1) * columnWidth + columnWidth/3;
  };

  return (
    <div className={s.container}>
      <svg className={s.viewBox}>
        {staff &&
          staff.map((itm, index) => {
            const y = 100 + index * 100;
            const x = getColumnX(1);
            return (
              <g key={index}>
                <text
                  key={"ST" + itm.id}
                  x={x}
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
                  x={x}
                  y={y}
                  item={itm}
                  colNumber={1}
                />
              </g>
            );
          })}
        {management &&
          management.map((itm, index) => {
            const y = 100 + index * 100;
            const x = getColumnX(2);
            return (
              <g key={index}>
                <text
                  key={"MT" + itm.id}
                  x={x}
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
                  x={x}
                  y={y}
                  item={itm}
                  colNumber={2}
                />
              </g>
            );
          })}
        {executive &&
          executive.map((itm, index) => {
            const y = 70 + index * 100;
            const x = getColumnX(3);
            return (
              <g key={index}>
                <text
                  key={"ET" + itm.id}
                  x={x}
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
                  x={x}
                  y={y}
                  item={itm}
                  colNumber={3}
                />
              </g>
            );
          })}
      </svg>
    </div>
  );
}
