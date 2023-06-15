import s from "./style.module.css";
import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import usState from "./path/us-state-map.json";
import usMSA from "./path/us-msa-map.json";
import usCounty from "./path/us-county-map.json";
import ToolTipList from "./ToolTipList/ToolTipList";
import { ZoomOut } from "react-bootstrap-icons";

export default function USMapChart({
  locType,
  mapData,
  startColor,
  endColor,
  locSelected,
  onClick,
  mapSize,
}) {
  const [hoveredPath, setHoveredPath] = useState(null);
  const [clickedPath, setClickedPath] = useState(null);
  const [geoData, setGeoData] = useState({});
  const [geoBG, setGeoBG] = useState({});
  const [mapWidth, setMapWidth] = useState(0);
  const [mapHeight, setMapHeight] = useState(0);
  const [mapTranslateX, setMapTranslateX] = useState(0);
  const [mapTranslateY, setMapTranslateY] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [mapScale, setMapScale] = useState(mapSize);
  useEffect(() => {
    setMapWidth(700);
    setMapHeight(400);
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
    const max = Math.max(...values);
    setMaxValue(max);
  }, [mapData, locType, startColor, endColor]);

  useEffect(() => {
    setClickedPath(locSelected);
  }, [locSelected]);

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

  const handleMapClick = (pathId, position, box) => {
    if (clickedPath === pathId) {
      setClickedPath(null);
    } else {
      setClickedPath(pathId);
    }
    onClick !== undefined && onClick(pathId);
    if (locType === "msa") {
      const scale =
        2 +
        Math.min(50 / (box[1][0] - box[0][0]), 50 / (box[1][1] - box[0][1]));
      const clickedX = -position[0] * scale + mapWidth / 2;
      const clickedY = -position[1] * scale + mapHeight / 2;
      setMapTranslateX(clickedX-90);
      setMapTranslateY(clickedY-35);
      setMapScale(scale);
    }
  };

  const handleZoomClick = () => {
    setMapTranslateX(0);
    setMapTranslateY(0);
    setMapScale(mapSize);
  };

  const viewBox = `-90 -35 ${mapWidth} ${mapHeight}`;

  return (
    <div
      className={s.container}
    >
      <svg
        width={mapWidth}
        height={mapHeight}
        viewBox={viewBox}
        className={s.svgViewBox}
      >
        {/* State background for the MSA map */}
        {geoBG &&
          geoBG.features &&
          geoBG.features.map((feature) => {
            return (
              <g
                className={s.mapViewBox}
                key={locType + feature.properties.GEOID}
                transform={`translate(${mapTranslateX},${mapTranslateY}) scale(${mapScale})`}
              >
                <path
                  key={locType + feature.properties.GEOID}
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
            const isClickedPath =
              clickedPath && feature.properties.GEOID === clickedPath;
            return (
              <g
                id={feature.properties.GEOID}
                className={s.mapViewBox}
                key={locType + feature.properties.GEOID}
                onMouseEnter={() => handleMouseEnter(feature.properties.GEOID)}
                onMouseLeave={() => handleMouseLeave(feature.properties.GEOID)}
                onClick={() =>
                  handleMapClick(feature.properties.GEOID, centroid, pathBounds)
                }
                transform={`translate(${mapTranslateX},${mapTranslateY}) scale(${mapScale})`}
              >
                <path
                  key={feature.properties.GEOID}
                  d={path(feature)}
                  fill={getFillColor(feature.properties.Value)}
                  className={`${s.statePath} ${
                    isClickedPath ? s.statePathSelected : ""
                  }`}
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
          const pathElement = document.getElementById(feature.properties.GEOID);
          const pos = pathElement && pathElement.getBoundingClientRect();
          return (
            <div key={feature.properties.GEOID}>
              {hoveredPath === feature.properties.GEOID && (
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
      {locType === "msa" && mapScale !== mapSize && (
        <button className={s.zoomOut} onClick={handleZoomClick}>
          {"Zoom out "} <ZoomOut size={16} />
        </button>
      )}
    </div>
  );
}
