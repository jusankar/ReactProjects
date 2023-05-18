import { useEffect, useState } from "react";
import s from "./style.module.css";
import CircleBox from "./CircleBox/CircleBox";
import { DataAPI } from "../../api/data";

export default function NodeChart({ data }) {
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
      <div className={s.column1}>
        <span>STAFF</span>
        {staffs &&
          staffs.map((itm) => {
            return (
              <CircleBox key={itm.id} item={itm} colNumber={1}></CircleBox>
            );
          })}
      </div>
      <div className={s.column2}>
        <span>MANAGEMENT</span>
        {management &&
          management.map((itm) => {
            return (
              <CircleBox key={itm.id} item={itm} colNumber={2} ></CircleBox>
            );
          })}
      </div>

      <div className={s.column3}>
        <span>EXECUTIVE</span>
        {executive &&
          executive.map((itm) => {
            return (
              <CircleBox key={itm.id} item={itm} colNumber={3} ></CircleBox>
            );
          })}
      </div>
    </div>
  );
}
