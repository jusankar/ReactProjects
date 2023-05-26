import React, { useState } from "react";
import s from "./style.module.css";
export default function Sector({ size, color, inputData }) {
  const [tooltip, setTooltip] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const getSectionStyles = (start, end) => {
    const radius = size;
    const startAngle = (Math.PI / 180) * start;
    const endAngle = (Math.PI / 180) * end;

    const centerX = size;
    const centerY = size;

    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;

    const pathData = [
      `M${centerX},${centerY}`,
      `L${x1},${y1}`,
      `A${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2}`,
      `Z`,
    ].join(" ");
    return pathData;
  };

  const handleMouseEnter = (item, event) => {
    setTooltip(item.Description);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setTooltip("");
    setTooltipPosition({ x: 0, y: 0 });
  };

  let start = 0;
  return (
    <div className={s.mainContainer}>
      <svg className={s.container} width={size*2} height={size*2}>
        {inputData &&
          inputData.map((item, index) => {
            const end = start + item.Percentage * 3.6;
            const pathStyle = getSectionStyles(start, end);
            start = end;
            return (
              <path
                key={index}
                d={pathStyle}
                fill={color[index]}
                onMouseEnter={(event) => handleMouseEnter(item, event)}
                onMouseLeave={handleMouseLeave}
              />
            );
          })}
        <circle cx={size} cy={size} r={size / 2} fill="rgb(12, 31, 50)" />
        {tooltip && (
          <foreignObject
            x={tooltipPosition.x - 50}
            y={tooltipPosition.y + 20}
            width="100"
            height="100"
          >
            <div className={s.toolTip}>{tooltip}</div>
          </foreignObject>
        )}
      </svg>
      {inputData &&
        inputData.map((item, index) => {
          return (
            <div key={index} className={s.legendConatiner}>
              <div className={s.bullet}  style={{ backgroundColor: color[index] }} />
              <span className={s.percentage} >{item.Percentage}%</span>
              <span className={s.description}>{item.Description}</span>
            </div>
          );
        })}
    </div>
  );
}
