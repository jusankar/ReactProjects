import { useState } from "react";
import DropDown from "../DropDown/DropDown";
import s from "./style.module.css";
import LineChart from "./LineChart/LineChart";

export default function JobLineChart({ periodOptions, demand, location }) {
  const [selectedOption, setSelectedOption] = useState(1);
  const labels = ["April","May","June", "July", "August","September","October", "November","December","January", "2023"];
  const data= [3796, 3413, 4052, 4252,3202,3238,3033,3218,2879,3099,2755,1000];
  return (
    <div className={s.mainContainer}>
      <div className={s.container}>
        <div className={s.leftContainer}>
          <h2>Job Demand</h2>
          <DropDown
            options={periodOptions}
            onChange={(item) => setSelectedOption(item)}
            selectedKey={selectedOption}
          ></DropDown>
        </div>
        <div className={s.rightContainer}>
          <span className={s.demandContainer}>{demand}</span>
          <span>In {location}</span>
        </div>
      </div>
      <div>
          <LineChart dataLabels={labels} dataValues={data} ></LineChart>
      </div>
    </div>
  );
}
