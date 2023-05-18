import { useEffect, useState } from "react";
import s from "./style.module.css";
import { DataAPI } from "../../api/data";
import CircleBox from "./CircleBox/CircleBox";

export default function InteractiveNodes() {
  const [staffs, setStaffs] = useState([]);
  const [management, setManagement] = useState([]);
  const [executive, setExecutive] = useState([]);

  async function getChartList() {
    const staffList = await DataAPI.getNodeData("Staff");
    setStaffs(staffList);
    const managementList = await DataAPI.getNodeData("Management");
    setManagement(managementList);
    const executiveList = await DataAPI.getNodeData("Executive");
    setExecutive(executiveList);
  }
  useEffect(() => {
    getChartList();
  }, []);
  return (
    <div className={s.container}>
      <svg viewBox="0 0 800 650" width="800" height="650">
        <rect x="0" y="0" width="800" height="650" fill="#373737" />
        {staffs &&
          staffs.map((itm, index) => {
            const y = 100 + index * 100;
            return (
              <>
                <text
                  x="150"
                  y="20"
                  textAnchor="middle"
                  fill="white"
                  textDecoration="underline"
                  fontSize={24}
                >
                  Staff
                </text>
                <CircleBox
                  key={itm.id}
                  x={150}
                  y={y}
                  item={itm}
                  colNumber={1}
                ></CircleBox>
              </>
            );
          })}
        {management &&
          management.map((itm, index) => {
            const y = 100 + index * 100;
            return (
              <>
                <text
                  x="400"
                  y="20"
                  textAnchor="middle"
                  fill="white"
                  textDecoration="underline"
                  fontSize={24}
                >
                  Management
                </text>
                <CircleBox
                  key={itm.id}
                  x={400}
                  y={y}
                  item={itm}
                  colNumber={2}
                ></CircleBox>
              </>
            );
          })}
        {executive &&
          executive.map((itm, index) => {
            const y = 70 + index * 100;
            return (
              <>
              <text
                  x="650"
                  y="20"
                  textAnchor="middle"
                  fill="white"
                  textDecoration="underline"
                  fontSize={24}
                >
                  Executive
                </text>
              <CircleBox
                key={itm.id}
                x={650}
                y={y}
                item={itm}
                colNumber={3}
              ></CircleBox>
              </>
            );
          })}
      </svg>
    </div>
  );
}
