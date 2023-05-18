import { useState } from "react";
import DropDown from "../DropDown/DropDown";
import s from "./style.module.css";
import BarChart from "./BarChart/BarChart";

export default function SalaryBarChart({
  locationOptions,
  salaryDistribution,
}) {
  const [selectedOption, setSelectedOption] = useState(2);
  const labels = ["$0k-35k", "$35k-49k", "$50k-74k", "over $75k"];
  const data= [234, 471, 930, 2368];
  return (
    <div className={s.mainContainer}>
      <div className={s.container}>
        <div>
          <div>
            <h2>{salaryDistribution.title}</h2>
          </div>
          <div className={s.salaryContainer}>
            <div>
              <h3>${salaryDistribution.salary}</h3>
            </div>
            <div>{salaryDistribution.subTitle}</div>
          </div>
        </div>
        <div className={s.inputContainer}>
          <DropDown
            options={locationOptions}
            onChange={(item) => setSelectedOption(item)}
            selectedKey={selectedOption}
          ></DropDown>
        </div>
      </div>
      <div>
        <BarChart dataLabels={labels} dataValues={data}></BarChart>
      </div>
    </div>
  );
}
