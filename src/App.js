import "./App.css";
import CarouselCard from "./components/CarouselCard/CarouselCard";
import ArrowButton from "./components/ArrowButton/ArrowButton";
import SelectionBox from "./components/SelectionBox/SelectionBox";
import DropDown from "./components/DropDown/DropDown";
import { useEffect, useState } from "react";
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
import { DataAPI } from "./api/data";
import InteractiveNodes from "./components/InteractiveNodes/InteractiveNodes";

function App() {
  const [stateJobCount, setStateJobCount] = useState([]);
  const [msaData, setMSAData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const jobCount = await DataAPI.getStateJobCount();
      setStateJobCount(jobCount);
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
  const options = [
    { key: 1, value: "All time" },
    { key: 2, value: "Past 3 months" },
    { key: 3, value: "Past 6 months" },
    { key: 4, value: "Past 12 months" },
  ];
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
      12. <BubbleChart valType={"Job Postings"} data={bubbleChartData} startColor={"rgb(181, 228, 237)"} endColor={"rgb(29, 93, 106)"}/>
      13. <USMapChart valType={"Job Postings"} locType="state" mapData={stateJobCount} startColor={"rgb(181, 228, 237)"} endColor={"rgb(29, 93, 106)"}  />
      {/* 14. <GaugeChart></GaugeChart> */}
      {/* 15. <InteractiveNodes></InteractiveNodes> */}
      {/* <XArrowLine></XArrowLine> */}

    </div>
  );
}

export default App;
