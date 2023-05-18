import React, { useEffect, useState } from "react";
import s from "./style.module.css";

export default function ArrowLines({ start, end }) {
  const [sX, setSX] = useState(0);
  const [sY, setSY] = useState(0);
  const [sR, setSR] = useState(0);
  const [eX, setEX] = useState(0);
  const [eY, setEY] = useState(0);

  useEffect(() => {
    const startCircle = document.getElementById(start);
    const sX = parseFloat(startCircle.getAttribute("cx"));
    const sY = parseFloat(startCircle.getAttribute("cy"));
    const sR = parseFloat(startCircle.getAttribute("r"));
    const endCircle = document.getElementById(end);
    const eX = parseFloat(endCircle.getAttribute("cx"));
    const eY = parseFloat(endCircle.getAttribute("cy"));
    setSX(sX);
    setSY(sY);
    setSR(sR);
    setEX(eX);
    setEY(eY);
  }, [start, end]);

  const getDAttribute = () => {
    if (sX === eX && sY === eY) {
      return `M ${sX + sR} ${sY} A ${sR} ${sR} 0 1 0 ${sX} ${sY - sR}`;
    } else if (sX !== eX && sY === eY) {
      return `M ${sX + sR},${sY} L ${eX - sR},${eY}`;
    } else if (sX === eX && sY > eY) {
      return `M ${sX - sR},${sY} Q ${sX - (sY - eY) / 2} ${
        sY + (eY - sY) / 2
      } ${eX - sR},${eY}`;
    } else if (sX === eX && sY < eY) {
      return `M ${sX + sR},${sY} Q ${sX - (sY - eY) / 2} ${
        sY + (eY - sY) / 2
      } ${eX + sR},${eY}`;
    } else if (sX < eX && sY < eY) {
      return `M ${sX + sR},${sY} Q${sX + (eX - sX) / 2} ${sY} ${
        (sX + eX) / 2
      } ${(sY + eY) / 2} Q ${sX + (eX - sX) / 2} ${eY} ${eX - sR},${eY}`;
    } else if (sX < eX && sY > eY) {
      return `M ${sX + sR},${sY} Q${sX + (eX - sX) / 2} ${sY} ${
        (sX + eX) / 2
      } ${(sY + eY) / 2} Q ${sX + (eX - sX) / 2} ${eY} ${eX - sR},${eY}`;
    }
  };

  return (
    <g>
      <defs>
        <marker
          id="arrowMarker"
          markerWidth="6"
          markerHeight="6"
          refX="6"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
          style={{
            animation: `${s.arrowAnimation} 2s infinite`,
          }}
        >
          <path d="M0 0 L6 3 L0 6" fill="white" />
        </marker>
      </defs>
        <path
          d={getDAttribute()}
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          marker-end="url(#arrowMarker)"
          style={{
            animation: `${s.pathAnimation} 2s forwards`,
          }}
        />
    </g>
  );
}
