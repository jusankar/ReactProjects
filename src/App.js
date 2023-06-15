import "./App.css";
import { useEffect, useState } from "react";
import { DataAPI } from "./api/data";
import CarouselCard from "./components/CarouselCard/CarouselCard";
import ArrowButton from "./components/ArrowButton/ArrowButton";
import SelectionBox from "./components/SelectionBox/SelectionBox";
import DropDown from "./components/DropDown/DropDown";
import BarChart from "./components/SalaryBarChart/SalaryBarChart";
import JobLineChart from "./components/JobLineChart/JobLineChart";
import EmployerChart from "./components/EmployerChart/EmployerChart";
import ExperienceChart from "./components/ExperienceChart/ExperienceChart";
import BulletList from "./components/BulletList/BulletList";
import NodeChart from "./components/NodeChart/NodeChart";
import XArrowLine from "./components/Test/XArrowLine";
import AutoSelect from "./components/AutoSelect/AutoSelect";
import BubbleChart from "./components/BubbleChart/BubbleChart";
import USMapChart from "./components/USMapChart/USMapChart";
import GaugeChart from "./components/GaugeChart/GaugeChart";
import InteractiveNodes from "./components/InteractiveNodes/InteractiveNodes";
import LocationDropDown from "./components/LocationDropDown/LocationDropDown";
import ColumnDropDown from "./components/ColoumnDropDown/ColumnDropDown";
import InformationBox from "./components/InformationBox/InformationBox";
import Testing from "./components/Test/Testing";
import Donut from "./components/Donut/Donut";
import CircleEqualSectors from "./components/Test/Testing";
import Sector from "./components/Test/Testing";
import VRank from "./components/VRank/VRank";
import HRank from "./components/HRank/HRank";
import LRank from "./components/LRank/LRank";
import Square from "./components/Square/Square";
import Legend from "./components/Legend/Legend";

function App() {
  const [stateJobCount, setStateJobCount] = useState([]);
  const [msaData, setMSAData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [staff, setStaff] = useState([]);
  const [management, setManagement] = useState([]);
  const [executive, setExecutive] = useState([]);

  useEffect(() => {
    async function getChartList() {
      const staffList = await DataAPI.getNodeData("Staff");
      setStaff(staffList);
      const managementList = await DataAPI.getNodeData("Management");
      setManagement(managementList);
      const executiveList = await DataAPI.getNodeData("Executive");
      setExecutive(executiveList);
    }
    getChartList();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const jobCount = await DataAPI.getStateJobCount();
      setStateJobCount(jobCount);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const location = await DataAPI.getLocations(["state", "msa"]);
      setLocations(location);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const msaCount = await DataAPI.getMSAData();
      setMSAData(msaCount);
    }
    fetchData();
  }, []);

  // Selection Box Sample input
  const defaultSelectedData = [
    {
      id: "1",
      name: "React",
    },
    {
      id: "2",
      name: "Basic",
    },
    {
      id: "3",
      name: "C++",
    },
  ];

  // CarouselCard Sample input
  const carouselItems = [
    {
      id: "1",
      title: "Sales Report",
      subTitles: ["Today's Sales", "Yesterday's Sales", "Last 7 Days Sales"],
      percentage: 85,
      circleText: "Sales Growth",
    },
    {
      id: "2",
      title: "Customer Feedback",
      subTitles: ["Positive Feedback", "Negative Feedback", "Neutral Feedback"],
      percentage: 68,
      circleText: "Customer Satisfaction",
    },
    {
      id: "3",
      title: "Social Media",
      subTitles: ["Facebook Likes", "Twitter Followers", "Instagram Followers"],
      percentage: 91,
      circleText: "Social Media Growth",
    },
    {
      id: "4",
      title: "Email Campaign",
      subTitles: ["Opened Emails", "Clicked Emails", "Bounced Emails"],
      percentage: 56,
      circleText: "Email Success",
    },
    {
      id: "5",
      title: "Website Traffic",
      subTitles: [
        "Today's Visitors",
        "Yesterday's Visitors",
        "Last 7 Days Visitors",
      ],
      percentage: 72,
      circleText: "Traffic Growth",
    },
    {
      id: "6",
      title: "Social Media",
      subTitles: ["Facebook Likes", "Twitter Followers", "Instagram Followers"],
      percentage: 91,
      circleText: "Social Media Growth",
    },
    {
      id: "7",
      title: "Email Campaign",
      subTitles: ["Opened Emails", "Clicked Emails", "Bounced Emails"],
      percentage: 56,
      circleText: "Email Success",
    },
    {
      id: "8",
      title: "Website Traffic",
      subTitles: [
        "Today's Visitors",
        "Yesterday's Visitors",
        "Last 7 Days Visitors",
      ],
      percentage: 72,
      circleText: "Traffic Growth",
    },
  ];

  // Data for Salary Bar Chart
  // const options = [
  //   { key: 1, value: "Canada" },
  //   { key: 2, value: "Alberta" },
  //   { key: 3, value: "British Cloumbia" },
  //   { key: 4, value: "Manitoba" },
  //   { key: 5, value: "New Brunswick" },
  //   { key: 6, value: "Nova Scotia" },
  //   { key: 7, value: "Ontario" },
  //   { key: 8, value: "QUebec" },
  // ];

  // Data for Line Bar chart
  // const options = [
  //   { key: 1, value: "All time" },
  //   { key: 2, value: "Past 3 months" },
  //   { key: 3, value: "Past 6 months" },
  //   { key: 4, value: "Past 12 months" },
  // ];
  const [selectedOption, setSelectedOption] = useState(1);
  const salaryDistribution = {
    title: "Salary Distribution",
    salary: "86,419",
    subTitle: "Average base salary",
  };

  // Data for Employer Chart
  const employerJobCount = [
    { id: 1, employer: "Amazon", count: 1723 },
    { id: 2, employer: "Harvest Builders", count: 1047 },
    { id: 3, employer: "Royal Bank of Canada", count: 753 },
  ];

  //Data for Experience Chart
  const experiencePercentage = [
    { id: 1, label: "9+ years", percentage: 8 },
    { id: 2, label: "6 to 8 years", percentage: 12 },
    { id: 3, label: "3 to 5 years", percentage: 50 },
    { id: 4, label: "0 to 2 years", percentage: 30 },
  ];

  //Data for Bullet list
  const list = [
    { id: 1, value: "Javascript" },
    { id: 2, value: "Javascript" },
    { id: 3, value: "Javascript" },
    { id: 4, value: "Javascript" },
    { id: 5, value: "Javascript" },
    { id: 6, value: "Javascript" },
    { id: 7, value: "Javascript" },
    { id: 8, value: "Javascript" },
    { id: 9, value: "Javascript" },
    { id: 10, value: "Javascript" },
    { id: 11, value: "Javascript" },
    { id: 12, value: "Javascript" },
    { id: 13, value: "Javascript" },
    { id: 14, value: "Javascript" },
    { id: 15, value: "Javascript" },
    { id: 16, value: "Javascript" },
    { id: 17, value: "Javascript" },
    { id: 18, value: "Javascript" },
    { id: 19, value: "Javascript" },
    { id: 20, value: "Javascript" },
    { id: 21, value: "Javascript" },
    { id: 22, value: "Javascript" },
    { id: 23, value: "Javascript" },
    { id: 24, value: "Javascript" },
  ];

  //Data for Node chart
  //available in nodeChart

  //Data for Bubble chart
  const bubbleChartData = [
    { id: 1, count: 3000, title: "Accountant" },
    { id: 2, count: 2500, title: "Manager Tax" },
    { id: 3, count: 1000, title: "Auditor" },
    { id: 4, count: 5750, title: "Manager Finance Assistant" },
    { id: 5, count: 625, title: "Controller" },
    { id: 6, count: 500, title: "Tax Accountant" },
    { id: 7, count: 300, title: "Software Manager" },
    { id: 8, count: 700, title: "Engineer" },
    { id: 9, count: 200, title: "Sr. Clerk" },
    { id: 10, count: 400, title: "Manager Web apps" },
    { id: 11, count: 15, title: "Clerk" },
    { id: 12, count: 2300, title: "Registered Nurse" },
    { id: 13, count: 570, title: "Tester" },
    { id: 14, count: 620, title: "Senior Software Engineer" },
    { id: 15, count: 400, title: "Software - VP" },
    { id: 16, count: 575, title: "Cashier" },
    { id: 17, count: 150, title: "QA Manager" },
    { id: 18, count: 1000, title: "CEO" },
    { id: 19, count: 1225, title: "Developer" },
    { id: 20, count: 842, title: "Team Leader" },
  ];
  // Data for Column dropdown
  const columnData = [
    {
      column1: [
        { id: 1, title: "Chief Financial Officer" },
        { id: 2, title: "Vice President, Finance/FP&A" },
        { id: 3, title: "Director, Finance/FP&A" },
        { id: 4, title: "Manager, Finance/FP&A" },
        { id: 5, title: "Senior Financial/FP&A Analyst" },
        { id: 6, title: "Financial/FP&A Analyst" },
        { id: 7, title: "Treasurer" },
        { id: 8, title: "Director, Treasury" },
        { id: 9, title: "Director, Risk Management" },
      ],
      column2: [
        { id: 10, title: "Manager, Treasury" },
        { id: 11, title: "Treasury Analyst" },
        { id: 12, title: "Controller" },
        { id: 13, title: "Director, Accounting" },
        { id: 14, title: "Manager, Accounting" },
        { id: 15, title: "Accountant" },
        { id: 16, title: "Accounting Clerk" },
        { id: 17, title: "Vice President, Audit" },
        { id: 18, title: "Director, Audit" },
      ],
      column3: [
        { id: 19, title: "Manager, Audit" },
        { id: 20, title: "Auditor" },
        { id: 21, title: "Vice President, Tax" },
        { id: 22, title: "Director, Tax" },
        { id: 23, title: "Manager, Tax" },
        { id: 24, title: "Tax Accountant" },
        { id: 25, title: "Tax Analyst" },
        { id: 26, title: "Finance Sector Overall" },
      ],
    },
  ];
  const [selectedId, setSelectedId] = useState(26);

  // Data for InformationBox
  const title = "Supply/demand ratio";

  //Donut test data
  const DonutTestData = [
    {
      ID: 1,
      Description: "Sub-BA Degree",
      Percentage: 50,
    },
    {
      ID: 2,
      Description: "BA's Degree",
      Percentage: 30,
    },
    {
      ID: 3,
      Description: "Post-grad Degree",
      Percentage: 20,
    },
  ];
  const DonutColors = ["#faa42a", "#cfe0f2", "#3fb7cf"];

  // Data for Square Box component
  const squareData = [ 
    { Occ_Id: 1, Occ_Name: "Chief Financial Officer", salary: 135.5 },
    { Occ_Id: 2, Occ_Name: "Vice PresOcc_Ident, Finance/FP&A", salary: 140 },
    { Occ_Id: 3, Occ_Name: "Director, Finance/FP&A", salary: 90.6 },
    { Occ_Id: 4, Occ_Name: "Manager, Finance/FP&A", salary: 93.6 },
    { Occ_Id: 5, Occ_Name: "Senior Financial/FP&A Analyst", salary: 75.2 },
    { Occ_Id: 6, Occ_Name: "Financial/FP&A Analyst", salary: 70.5 },
    { Occ_Id: 7, Occ_Name: "Treasurer", salary: 50.3 },
    { Occ_Id: 8, Occ_Name: "Director, Treasury", salary: 90 },
    { Occ_Id: 9, Occ_Name: "Director, Risk Management", salary: 90.1 },
    { Occ_Id: 10, Occ_Name: "Manager, Treasury", salary: 80.0 },
    { Occ_Id: 11, Occ_Name: "Treasury Analyst", salary: 79.0 },
    { Occ_Id: 12, Occ_Name: "Controller", salary: 60 },
    { Occ_Id: 13, Occ_Name: "Director, Accounting", salary: 89.5 },
    { Occ_Id: 14, Occ_Name: "Manager, Accounting", salary: 87.2 },
    { Occ_Id: 15, Occ_Name: "Accountant", salary: 45.0 },
    { Occ_Id: 16, Occ_Name: "Accounting Clerk", salary: 36.0 },
    { Occ_Id: 17, Occ_Name: "Vice PresOcc_Ident, Audit", salary: 130 },
    { Occ_Id: 18, Occ_Name: "Director, Audit", salary: 120 },
    { Occ_Id: 19, Occ_Name: "Manager, Audit", salary: 100 },
    { Occ_Id: 20, Occ_Name: "Auditor", salary: 95 },
    { Occ_Id: 21, Occ_Name: "Vice PresOcc_Ident, Tax", salary: 141 },
    { Occ_Id: 22, Occ_Name: "Director, Tax", salary: 132 },
    { Occ_Id: 23, Occ_Name: "Manager, Tax", salary: 130 },
    { Occ_Id: 24, Occ_Name: "Tax Accountant", salary: 101 },
    { Occ_Id: 25, Occ_Name: "Tax Analyst", salary: 99.9 },
    { Occ_Id: 26, Occ_Name: "Finance Sector Overall", salary: 125.0 },
];
  return (
    <div>
      {/* 1. <SelectionBox defaultSelectedData={defaultSelectedData} textPlaceHolder="Type more skills...." /> */}
      {/* 2. <ArrowButton Text="Explore recommendations" /> */}
      {/* 3. <CarouselCard carouselItems={carouselItems}/> */}
      {/* 4.  <DropDown options={options} onChange={(item) => setSelectedOption(item)} selectedKey={selectedOption} placeholder={"type to search"} /> */}
      {/* 5. <BarChart locationOptions={options} salaryDistribution={salaryDistribution} /> */}
      {/* 6. <JobLineChart periodOptions={options}  demand="Very High" location="Canada" /> */}
      {/* 7. <EmployerChart data={employerJobCount}/> */}
      {/* 8. <ExperienceChart data={experiencePercentage}/> */}
      {/* 9. <BulletList data={list}/> */}
      {/* 10. <NodeChart></NodeChart> */}
      {/* 11. <AutoSelect textPlaceHolder={"e.g. Marketing Specialist..."} buttonText={"View popular skills"} options={options} onChange={(item) => setSelectedOption(item)} selectedKey={selectedOption} /> */}
      {/* 12. <BubbleChart valType={"Job Postings"} data={bubbleChartData} startColor={"rgb(181, 228, 237)"} endColor={"rgb(29, 93, 106)"}/> */}
      {/* 13. <USMapChart locSelected={27} valType={"Job Postings"} onClick={(id) => {console.log(id);}} locType="msa" mapSize={0.8} mapData={msaData} startColor={"rgb(181, 228, 237)"} endColor={"rgb(29, 93, 106)"}  /> */}
      14. <InteractiveNodes staff={staff} management={management} executive={executive}></InteractiveNodes>
      {/* 15. <LocationDropDown locData={locations} onChange={(item) => setSelectedOption(item)} selectedId={0} placeholder={"Search Country or Metro Area"}></LocationDropDown> */}
      {/* 16. <ColumnDropDown  columnData={columnData} onChange={(item) => setSelectedId(item)} selectedId={selectedId} placeholder={"type to search"}></ColumnDropDown> */}
      {/* 17. <InformationBox title={title} ></InformationBox> */}
      {/* 18. <GaugeChart startValue={500} endValue={2000} pointedValue={750} duration={1}></GaugeChart> */}
      {/* 19. <Donut size={100} color={DonutColors} inputData={DonutTestData}></Donut> */}
      {/* 20. <VRank selectedId={1} data={stateJobCount}/> */}
      {/* 21. <HRank selectedId={1} data={stateJobCount}/> */}
      {/* 22. <LRank selectedId={1} data={stateJobCount}/> */}
      {/* 23. <Square selectedCode={4} data={squareData} /> */}
      {/* 24. <Legend title={"Salary"} minValue={1000} maxValue={20000} numIntervals={4} startColor={"rgb(181, 228, 237)"} endColor={"rgb(29, 93, 106)"}   /> */}
      {/* <XArrowLine></XArrowLine> */}
      {/* <Sector size={200} inputData={DonutTestData}></Sector> */}
    </div>
  );
}

export default App;
