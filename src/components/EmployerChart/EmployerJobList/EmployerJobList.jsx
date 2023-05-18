import s from "./style.module.css";

export default function EmployerJobList({item}){
    return (
        <div className={s.container}>
            <div className={s.textContent}>{item.employer}</div>
            <div className={s.jobCount}>{item.count}</div>
        </div>
    );
}