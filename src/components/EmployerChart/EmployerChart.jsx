import EmployerJobList from "./EmployerJobList/EmployerJobList";
import s from "./style.module.css";
export default function EmployerChart({data}){
    return (
        <div className={s.container}>
            <div className={s.subContainer}>
                <h2>Top Employers</h2>
                <span>Number of job postings per employer</span>
            </div>
            <div>
                {data.map((item)=> {
                    return (
                       <EmployerJobList key={item.id} item={item}></EmployerJobList>
                    );
                })}
            </div>
        </div>
    )
}