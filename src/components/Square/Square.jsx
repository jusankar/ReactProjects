import { useEffect, useState } from "react";
import s from "./style.module.css";

export default function Square({ selectedCode, data }) {
  const [salary, setSalary] = useState(0);
  const [minSalary, setMinSalary] = useState([]);
  const [maxSalary, setMaxSalary] = useState([]);
  const [valueSize, setValueSize] = useState(0);

  useEffect(() => {
    // Find the salary on selected code
    const salary = data.find((item) => item.id === selectedCode)?.salary;
    setSalary(salary);

    // Find the min salary and it's title
    const minSalaryData = data.reduce((min, current) => {
      return current.salary < min.salary ? current : min;
    }, data[0]);
    setMinSalary(minSalaryData);

    // Find the max salary and it's title
    const maxSalaryData = data.reduce((max, current) => {
      return current.salary > max.salary ? current : max;
    }, data[0]);
    setMaxSalary(maxSalaryData);

    // Find the square size of selected salary
    const p =
      ((salary - minSalary.salary) / (maxSalary.salary - minSalary.salary)) *
      100;
    setValueSize(p + 100);
  }, [selectedCode, data, maxSalary.salary, minSalary.salary]);

  return (
    <div className={s.mainConatiner}>
      <div className={s.container}>
        <div className={s.squaresContainer}>
          <div className={s.minSquare}></div>
          <div className={s.maxSquare}></div>
          <div
            className={`${s.valueSquare}`}
            style={{ width: `${valueSize}px`, height: `${valueSize}px` }}
          ></div>
        </div>
        <div className={s.legendConatiner}>
          <div>
            <div className={s.squareLegendItem}>
              <span className={`${s.s6} ${s.selectedS}`}></span>
              <span className={s.s4}></span>
              <span className={s.s2}></span>
            </div>
            <div className={s.text}>
              {maxSalary.title}:<span>${maxSalary.salary}k</span>
            </div>
          </div>
          <div>
            <div className={s.squareLegendItem}>
              <span className={s.s6}></span>
              <span className={s.s4}></span>
              <span className={`${s.s2} ${s.selectedS}`}></span>
            </div>
            <div className={s.text}>
              <span>{minSalary.title}:</span>
              <span>${minSalary.salary}k</span>
            </div>
          </div>
        </div>
      </div>
      <h2 className={s.value}>${salary}k</h2>
    </div>
  );
}
