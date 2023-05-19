import s from "./style.module.css";
import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import usState from "./path/us-state-map.json";
import usMSA from "./path/us-msa-map.json";
import usCounty from "./path/us-county-map.json";
import ToolTipList from "./ToolTipList/ToolTipList";
import { ZoomOut } from "react-bootstrap-icons";
import Legend from "../Legend/Legend";

export default function USMapChart({
  locType,
  valType,
  mapData,
  startColor,
  endColor,
}) {
  const [hoveredPath, setHoveredPath] = useState(null);
  const [geoData, setGeoData] = useState({});
  const [geoBG, setGeoBG] = useState({});
  const [mapWidth, setMapWidth] = useState(800);
  const [mapHeight, setMapHeight] = useState(550);
  const [mapTranslateX, setMapTranslateX] = useState(0);
  const [mapTranslateY, setMapTranslateY] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [mapScale, setMapScale] = useState(1);

  useEffect(() => {
    let geoData;
    switch (locType) {
      case "state":
        geoData = usState;
        break;
      case "msa":
        setGeoBG(usState);
        geoData = usMSA;
        break;
      case "county":
        geoData = usCounty;
        break;
      default:
        geoData = usState;
    }
    geoData.features &&
      geoData.features.forEach((feature) => {
        let matchGeo;
        switch (locType) {
          case "state":
            let stateCode = feature.properties.STUSPS;
            matchGeo = mapData?.find((st) => st.StateCode === stateCode);
            break;
          case "msa":
            let geoID = feature.properties.GEOID;
            matchGeo = mapData?.find((msa) => msa.ID === geoID);
            break;
          default:
            break;
        }
        if (matchGeo) {
          feature.properties.Value = matchGeo.Value;
          feature.properties.ToolTip = matchGeo.ToolTip;
        }
      });
    setGeoData(geoData);
    const values = geoData.features
      .map((feature) => feature.properties.Value)
      .filter((value) => value !== undefined && value !== null && value !== 0);

    const min = Math.min(...values);
    const max = Math.max(...values);
    setMinValue(min);
    setMaxValue(max);
  }, [mapData, locType, startColor, endColor]);

  const getFillColor = (count) => {
    if (count && count !== 0) {
      const percent = count / maxValue;
      return d3.interpolateRgb(
        startColor ? startColor : "rgba(183, 193, 198, 1)",
        endColor ? endColor : " rgba(73, 83, 88, 1)"
      )(percent);
    } else {
      return "rgba(255,255,255,0.7)";
    }
  };

  if (!geoData.features) {
    return null;
  }
  const projection = d3.geoAlbersUsa().translate([mapWidth / 2, mapHeight / 2]);
  const path = d3.geoPath().projection(projection);

  const handleMouseEnter = (pathId) => {
    setHoveredPath(pathId);
  };

  const handleMouseLeave = (pathId) => {
    if (hoveredPath === pathId) {
      setHoveredPath(null);
    }
  };

  const clickedMSA = (position, box) => {
    const scale =
      2 + Math.min(50 / (box[1][0] - box[0][0]), 50 / (box[1][1] - box[0][1]));
    const clickedX = -position[0] * scale + mapWidth / 2;
    const clickedY = -position[1] * scale + mapHeight / 2;
    setMapTranslateX(clickedX);
    setMapTranslateY(clickedY);
    setMapScale(scale);
  };

  const handleClick = () => {
    setMapTranslateX(0);
    setMapTranslateY(0);
    setMapScale(1);
  };
  return (
    <div
      className={s.conatiner}
      style={{ height: `${mapHeight}px`, width: `${mapWidth}px` }}
    >
      <svg
        width={mapWidth}
        height={mapHeight}
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        className={s.svgViewBox}
      >
        {/* State background for the MSA map */}
        {geoBG &&
          geoBG.features &&
          geoBG.features.map((feature) => {
            return (
              <g
                className={s.mapViewBox}
                key={locType + feature.properties.AFFGEOID}
                transform={`translate(${mapTranslateX},${mapTranslateY}) scale(${mapScale})`}
              >
                <path
                  key={locType + feature.properties.AFFGEOID}
                  d={path(feature)}
                  className={s.stateBGPath}
                />
              </g>
            );
          })}
        {/* State OR MSA map based on the path feeded in geoData */}
        {geoData &&
          geoData.features.map((feature) => {
            const centroid = path.centroid(feature);
            const pathBounds = path.bounds(feature);
            return (
              <g
                id={feature.properties.AFFGEOID}
                className={s.mapViewBox}
                key={locType + feature.properties.AFFGEOID}
                onMouseEnter={() =>
                  handleMouseEnter(feature.properties.AFFGEOID)
                }
                onMouseLeave={() =>
                  handleMouseLeave(feature.properties.AFFGEOID)
                }
                onClick={() => clickedMSA(centroid, pathBounds)}
                transform={`translate(${mapTranslateX},${mapTranslateY}) scale(${mapScale})`}
              >
                <path
                  key={feature.properties.AFFGEOID}
                  d={path(feature)}
                  fill={getFillColor(feature.properties.Value)}
                  strokeWidth={0.5}
                  className={s.statePath}
                />
                {/* {centroid[0] && centroid[1] && (
                  <text x={centroid[0]} y={centroid[1]} textAnchor="middle">
                    {feature.properties.STUSPS}
                  </text>
                )} */}
              </g>
            );
          })}
      </svg>
      {/* Tool tip details  */}
      {geoData &&
        geoData.features &&
        geoData.features.map((feature) => {
          const pathElement = document.getElementById(
            feature.properties.AFFGEOID
          );
          const pos = pathElement && pathElement.getBoundingClientRect();
          return (
            <div key={feature.properties.AFFGEOID}>
              {hoveredPath === feature.properties.AFFGEOID && (
                <div
                  style={{
                    top: pos.top + pos.height / 2,
                    left: pos.left + pos.width,
                  }}
                  className={s.tooltip}
                >
                  <div className={s.tooltipContent}>
                    <div className={s.toolTipTitle}>
                      {feature.properties.NAME}:
                    </div>
                    <ToolTipList feature={feature}></ToolTipList>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      {mapScale !== 1 && (
        <button className={s.zoomOut} onClick={handleClick}>
          {"Zoom out "} <ZoomOut size={16} />
        </button>
      )}
      <Legend
        title={valType}
        minValue={minValue}
        maxValue={maxValue}
        numIntervals={4}
        startColor={startColor}
        endColor={endColor}
      ></Legend>
    </div>
  );
}
