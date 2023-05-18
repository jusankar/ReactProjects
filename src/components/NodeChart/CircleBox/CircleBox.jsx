import { useEffect, useState } from "react";
import s from "./style.module.css";
import XarrowList from "./XarrowList/XarrowList";
import { DataAPI } from "../../../api/data";

export default function CircleBox({ item, colNumber }) {
  const [isHovering, setIsHovering] = useState(false);
  const [data, setData] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [toolTipCount, setToolTipCount] = useState(0);

  async function getDataList() {
    const dataList = await DataAPI.getArrowData(item.tier, item.value);
    setData(dataList);
    const count = dataList.filter((item) => item.toolTipData !== "").length;
    setToolTipCount(count);
  }
  //   useEffect(() => {
  //     if (isHovering) {
  //       getDataList();
  //     }
  //   }, [isHovering]);

  useEffect(() => {
    getDataList();
  }, []);

  useEffect(() => {
    getDataList();
    const uniqueData = [
      ...new Set(
        data
          .map((item) => item.fromData)
          .concat(data.map((item) => item.toData))
      ),
    ];
    const findDivId = (data) => {
      const divId = document.getElementById("BOX" + data);
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
  }, [isHovering]);

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
    <div>
      <div
        id={"BOX" + item.id}
        className={`${s.box} ${isHovering ? s.active : ""}`}
      >
        <div
          id={item.id}
          className={`${s.circle}  ${
            colNumber === 3
              ? s.circleColumn3
              : colNumber === 1
              ? s.circleColumn1
              : s.circleColumn2
          }`}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {toolTipCount === 0 && (
            <div className={s.blackring}>
              {" "}
              <div className={s.blackcircle}> </div>{" "}
            </div>
          )}
          {toolTipCount >= 1 && <div className={s.circle1}></div>}
          {toolTipCount >= 2 && <div className={s.circle2}></div>}
          {toolTipCount >= 3 && <div className={s.circle3}></div>}
          {showTooltip && (
            <div className={s.tooltip}>
              Occupation
              {data &&
                data.map((item) => {
                  return (
                    <div key={item.id} className={s.toolTipList}>
                      {item.toolTipData}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        {item.value}
      </div>
      {isHovering &&
        data &&
        data.map((itm) => {
          return (
            <XarrowList
              key={itm.id}
              start={itm.toData}
              end={itm.fromData}
            ></XarrowList>
          );
        })}
    </div>
  );
}
