import { useEffect, useState } from "react";
import s from "./style.module.css";

export default function HRank({ selectedCode, data }) {
  const [toolTip, setToolTip] = useState([]);
  const [sortData, setSortData] = useState([]);
  const [rank, setRank] = useState(0);
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    const selectedValue = data.find(
      (item) => item.StateCode === selectedCode
    )?.Value;
    setValue(selectedValue);

    if (selectedValue !== undefined) {
      // Sort the data based on the value in ascending order
      const sortedData = data.slice().sort((a, b) => b.Value - a.Value);
      setSortData(sortedData);

      // Find the index of the selected code's value in the sorted data
      const selectedIndex = sortedData.findIndex(
        (item) => item.Value === selectedValue
      );

      if (selectedIndex !== -1) {
        const cnt = sortedData.length;
        const max = sortedData.reduce(
          (max, item) => Math.max(max, item.Value),
          0
        );
        setRank(selectedIndex + 1);
        setCount(cnt);
        setMaxValue(max);
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
      <div className={s.container}>
        {sortData &&
          sortData.map((item, index) => (
            <div
              key={item.StateCode}
              className={`${s.bar} ${
                item.Value === value ? s.selectedBar : s.horizontalBar
              }`}
              style={{
                height: `${(item.Value * 300) / maxValue}px`,
                width: `${300 / count}px`,
              }}
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={handleMouseLeave}
            >
              {toolTip && toolTip.StateCode === item.StateCode && (
                <div className={s.toolTip} style={{ x: `${index * 10}px` }}>
                  <div>State Code: {toolTip.StateCode} </div>
                  <div>Value: {toolTip.Value} </div>
                </div>
              )}
            </div>
          ))}
      </div>

      <div className={s.bottomText}>{`Rank ${rank} out of ${count}`}</div>
    </div>
  );
}
