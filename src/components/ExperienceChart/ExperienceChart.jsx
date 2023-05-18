import PercentageDistribution from "./PercentageDistribution/PercentageDistribution";
import s from "./style.module.css";

export default function ExperienceChart({data}){
    const maxPercentage = Math.max(...data.map(item => item.percentage));

    return (
        <div className={s.mainContainer} >
            <div className={s.titleContent}>
                <h2>Experience</h2>
                <span>Average year of experience for the occupation</span>
            </div>
            <div className={s.chart} >
                <div>
                {data.map((item)=> {
                    return (
                       <PercentageDistribution key={item.id} items={item} maxPercentage={maxPercentage} ></PercentageDistribution>
                    );
                })}
                </div>
            </div>
        </div>
    );
}