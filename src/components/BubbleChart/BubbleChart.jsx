import { useState } from "react";
import s from "./style.module.css";
import * as d3 from "d3";

export default function BubbleChart({valType, data, startColor, endColor }) {
  const [hoveredCircle, setHoveredCircle] = useState(null);
  const svgWidth = 500; // or whatever the width of your SVG container is
  const svgHeight = 500; // or whatever the height of your SVG container is

  const maxCount = Math.max(...data.map((item) => item.count));

  const pack = d3.pack().size([svgWidth, svgHeight]).padding(5);

  const nodes = d3
    .hierarchy({ children: data })
    .sum((d) => (d.count * 100) / maxCount);
  const circles = pack(nodes).leaves();

  const handleMouseEnter = (circleId) => {
    setHoveredCircle(circleId);
  };

  const handleMouseLeave = (circleId) => {
    if (hoveredCircle === circleId) {
      setHoveredCircle(null);
    }
  };
  const getFillColor = (count) => {
    const percent = (count * 100) / maxCount;
    return d3.interpolateRgb(
      startColor ? startColor : "rgba(183, 193, 198, 1)",
      endColor ? endColor : " rgba(73, 83, 88, 1)"
    )(percent / 100);
  };
  return (
    <div className={s.mainConatiner}>
      <svg
        width={svgWidth}
        height={svgHeight}
        className={`${s.container} ${s.svgContainer}`}
      >
        {circles &&
          circles.map((circle) => {
            return (
              <g
                key={circle.data.id}
                onMouseEnter={() => handleMouseEnter(circle.data.id)}
                onMouseLeave={() => handleMouseLeave(circle.data.id)}
              >
                <circle
                  className={s.circle}
                  cx={circle.x}
                  cy={circle.y}
                  r={circle.r}
                  fill={getFillColor(circle.data.count)}
                />
                {/* Check if title fits within circle and render text if it does */}
                {circle.data.title.length*5 <= circle.r*2 && (
                  <foreignObject
                    x={circle.x - circle.r}
                    y={circle.y - circle.r}
                    width={circle.r * 2}
                    height={circle.r * 2}
                  >
                    <div className={s.circleContent}>
                      <div className={s.circleText}>{circle.data.title}</div>
                    </div>
                  </foreignObject>
                )}
              </g>
            );
          })}
      </svg>
      {circles &&
        circles.map((circle) => {
          return (
            <div key={"T" + circle.data.id}>
              {hoveredCircle === circle.data.id && (
                <div
                  className={s.tooltip}
                  style={{
                    top: circle.y + circle.r,
                    left: circle.x + circle.r,
                  }}
                >
                  <div className={s.tooltipContent}>
                    <div className={s.toolTipTitle}>{circle.data.title}</div>
                    <div>{valType}</div>
                    <div className={s.toolTipCount}>{valType==="Salary" && "$"}{circle.data.count}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}
