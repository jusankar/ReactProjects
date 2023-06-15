import React, { useEffect, useState } from "react";
import ArrowLines from "./ArrowLines/ArrowLines";

export default function CircleBox({ x, y, item, colNumber }) {
  const [isHovering, setIsHovering] = useState(false);
  const [toolTipCount, setToolTipCount] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getDataList() {
      const dataList = item.dataList;
      setData(dataList);
      const count = dataList.filter((item) => item.toolTipData !== "").length;
      setToolTipCount(count);
    }
    getDataList();
    const uniqueData = [
      ...new Set(
        data
          .map((item) => item.fromData)
          .concat(data.map((item) => item.toData))
      ),
    ];
    const findDivId = (data) => {
      const divId = document.getElementById(data);
      if (divId) {
        return divId.getAttribute("id");
      }
      return null;
    };

    uniqueData.forEach((data) => {
      const id = findDivId(data);
      if (id) {
        // do something with the id
        const element = document.getElementById(id);
        isHovering
          ? (element.style.opacity = 1)
          : (element.style.opacity = 0.5);
      }
    });
  }, [data, isHovering, item.dataList]);

  const handleClick = () => {
    setShowTooltip(!showTooltip);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowTooltip(false);
    //setData([]); // reset data when mouse leaves
  };
  return (
    <g
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <circle
        id={item.id}
        cx={x}
        cy={y}
        r="30"
        strokeWidth="1.5"
        fill={`rgba(${
          colNumber === 3
            ? "125, 208, 225"
            : colNumber === 2
            ? "250, 164, 43"
            : "239, 68, 68"
        }, 1)`}
      />
      {toolTipCount === 0 && (
        <>
          <circle
            cx={x}
            cy={y}
            r="25"
            stroke="black"
            strokeWidth="5"
            fill="none"
          />
          <circle cx={x} cy={y} r="10" stroke="black" fill="black" />
        </>
      )}
      {toolTipCount === 1 && (
        <>
          <circle cx={x} cy={y} r="10" stroke="black" fill="none" />
        </>
      )}
      {toolTipCount === 2 && (
        <>
          <circle cx={x - 15} cy={y} r="10" stroke="black" fill="none" />
          <circle cx={x + 15} cy={y} r="10" stroke="black" fill="none" />
        </>
      )}
      {toolTipCount > 2 && (
        <>
          <circle cx={x - 15} cy={y - 10} r="10" stroke="black" fill="none" />
          <circle cx={x + 15} cy={y - 10} r="10" stroke="black" fill="none" />
          <circle cx={x} cy={y + 10} r="10" stroke="black" fill="none" />
        </>
      )}
      <text x={x} y={y + 50} textAnchor="middle" fill="white">
        {item.value}
      </text>
      {isHovering &&
        data &&
        data.map((itm) => {
          return (
            <ArrowLines
              key={itm.id}
              start={itm.toData}
              end={itm.fromData}
            ></ArrowLines>
          );
        })}
    </g>
  );
}
