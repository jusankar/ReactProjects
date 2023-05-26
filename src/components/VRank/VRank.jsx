import { useEffect, useState } from "react";
import s from "./style.module.css";

export default function VRank({ selectedCode, data }) {
  const [toolTip, setToolTip] = useState([]);
  const [subsetData, setSubsetData] = useState([]);
  const [rank, setRank] = useState(0);
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const selectedValue = data.find(
      (item) => item.StateCode === selectedCode
    )?.Value;
    setValue(selectedValue);

    if (selectedValue !== undefined) {
      // Sort the data based on the value in ascending order
      const sortedData = data.slice().sort((a, b) => b.Value - a.Value);

      // Find the index of the selected code's value in the sorted data
      const selectedIndex = sortedData.findIndex(
        (item) => item.Value === selectedValue
      );

      if (selectedIndex !== -1) {
        const startIndex = Math.max(0, selectedIndex - 5);
        const endIndex = Math.min(sortedData.length , selectedIndex + 4);
        const subsetData = sortedData.slice(startIndex, endIndex + 1);
        const totalCount = sortedData.length;
        const totalSum = subsetData.reduce((sum, item) => sum + item.Value, 0);
        setSubsetData(subsetData);
        setRank(selectedIndex + 1);
        setCount(totalCount);
        setTotal(totalSum);
      }
    }
  }, [data, selectedCode]);

  const handleMouseEnter = (item) => {
    setToolTip(item);
  };

  const handleMouseLeave = () => {
    setToolTip("");
  };

  return (
    <div className={s.mainContainer}>
      <div>
        <h2>{value && value.toLocaleString()}</h2>
      </div>
      {subsetData.map((item) => (
        <div
          key={item.StateCode}
          className={`${s.bar} ${
            item.Value === value ? s.selectedBar : s.verticalBar
          }`}
          style={{ width: `${((item.Value * 300) / total)+20}px` }}
          onMouseEnter={() => handleMouseEnter(item)}
          onMouseLeave={handleMouseLeave}
        >
          {toolTip && toolTip.StateCode === item.StateCode && (
            <div className={s.toolTip}
            style={{ left: `${((item.Value * 300) / total)+100}px` }}
            >
              <div>State Code: {toolTip.StateCode} </div>
              <div>Value: {toolTip.Value} </div>
            </div>
          )}
        </div>
      ))}
      <div className={s.bottomText}>{`Rank ${rank} out of ${count}`}</div>
    </div>
  );
}
