import { useEffect, useState } from "react";
import s from "./style.module.css";

export default function LRank({ selectedCode, data }) {
  const [selectedRange, setSelectedRange] = useState(0);
  useEffect(() => {
    // Find the selected value from the selected Code
    const selectedValue = data.find(
      (item) => item.StateCode === selectedCode
    )?.Value;
    // Find the maximum value
    const values = data.map((item) => item.Value);
    const maxValue = Math.max(...values);

    // Calculate the range values
    const rangeSize = maxValue / 4;
    const ranges = [
      { label: "Low", min: 0, max: rangeSize },
      { label: "Average", min: rangeSize + 1, max: rangeSize * 2 },
      { label: "High", min: rangeSize * 2 + 1, max: rangeSize * 3 },
      { label: "Very High", min: rangeSize * 3 + 1, max: maxValue },
    ];

    for (const range of ranges) {
      if (selectedValue >= range.min && selectedValue <= range.max) {
        setSelectedRange(range.label);
        break;
      }
    }
  }, [data, selectedCode]);

  return (
    <div className={s.mainContainer}>
      <h2>{selectedRange}</h2>
      <div className={s.lineConatiner}>
        <div
          className={`${s.line} ${
            selectedRange === "Low" ? s.selectedLine : s.unselectedLine
          }`}
        ></div>
        <div
          className={`${s.line} ${
            selectedRange === "Average" ? s.selectedLine : s.unselectedLine
          }`}
        ></div>
        <div
          className={`${s.line} ${
            selectedRange === "High" ? s.selectedLine : s.unselectedLine
          }`}
        ></div>
        <div
          className={`${s.line} ${
            selectedRange === "Very High" ? s.selectedLine : s.unselectedLine
          }`}
        ></div>
      </div>
    </div>
  );
}
