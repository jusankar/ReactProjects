import React from "react";

export default function Sector({ size, inputData }) {
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
  const color = ["#faa42a", "#cfe0f2", "#3fb7cf"];
  let start = 0;

  return (
    <svg width="400" height="400">
      {inputData &&
        inputData.map((item, index) => {
          const end = start + item.Percentage * 3.6;
          const pathStyle = getSectionStyles(start, end);
          start = end;
          return <path key={index} d={pathStyle} fill={color[index]} />;
        })}
      <circle cx={size} cy={size} r={size / 2} fill="white" />
    </svg>
  );
}
