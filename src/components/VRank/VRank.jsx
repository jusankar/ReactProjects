import React, { useEffect, useState } from "react";
import s from "./style.module.css";

export default function VRank({ selectedId, data }) {
  const [toolTip, setToolTip] = useState("");
  const [subsetData, setSubsetData] = useState([]);
  const [rank, setRank] = useState(0);
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const selectedValue = data.find((item) => item.Id === selectedId);
    setValue(selectedValue);

    if (selectedValue !== undefined) {
      // Sort the data based on the value in ascending order
      const sortedData = data.slice().sort((a, b) => b.Value - a.Value);
      // Find the index of the selected code's value in the sorted data
      const selectedIndex = sortedData.findIndex(
        (item) => item === selectedValue
      );

      if (selectedIndex !== -1) {
        let startIndex = Math.max(0, selectedIndex - 4);
        let endIndex = Math.min(sortedData.length - 1, selectedIndex + 4);
        let subsetData;

        if (endIndex - startIndex < 9) {
          const diff = 9 - (endIndex - startIndex);
          if (startIndex === 0) {
            endIndex = Math.min(sortedData.length - 1, endIndex + diff);
          } else if (endIndex === sortedData.length - 1) {
            startIndex = Math.max(0, startIndex - diff);
          } else {
            const halfDiff = Math.floor(diff / 2);
            startIndex = Math.max(0, startIndex - halfDiff);
            endIndex = Math.min(
              sortedData.length - 1,
              endIndex + (diff - halfDiff)
            );
          }
        }
        subsetData = sortedData.slice(startIndex, endIndex + 1);

        const totalCount = sortedData.length;
        const totalSum = subsetData.reduce((sum, item) => sum + item.Value, 0);
        setSubsetData(subsetData);
        setRank(selectedIndex + 1);
        setCount(totalCount);
        setTotal(totalSum);
      }
    }
  }, [data, selectedId]);

  const handleMouseEnter = (item) => {
    setToolTip(item);
  };

  const handleMouseLeave = () => {
    setToolTip("");
  };

  return (
    <div className={s.mainContainer}>
      <div>
        <h2>{value?.Value && value?.Value.toLocaleString()}</h2>
      </div>
      {subsetData.map((item) => (
        <div
          key={item.Id}
          className={`${s.bar} ${
            item === value ? s.selectedBar : s.verticalBar
          }`}
          style={{ width: `${(item.Value * 300) / total + 20}px` }}
          onMouseEnter={() => handleMouseEnter(item)}
          onMouseLeave={handleMouseLeave}
        >
          {toolTip && toolTip.Id === item.Id && (
            <div
              className={s.toolTip}
              style={{ left: `${(item.Value * 300) / total + 100}px` }}
            >
              <div>{item.Name} </div>
              <div>{item.Value} </div>
            </div>
          )}
        </div>
      ))}
      <div className={s.bottomText}>{`Rank ${rank} out of ${count}`}</div>
    </div>
  );
}
