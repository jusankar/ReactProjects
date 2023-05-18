import s from "./style.module.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Card({title,subTitles,percentage,circleText}) {
  return (
    <div className={s.container}>
      <div className={s.title}>{title}</div>
      <div className={s.bottombox}>
        <div className={s.subtitles}>
          <span>{subTitles[0]} </span>
          <span>{subTitles[1]}</span>
          <span>{subTitles[2]}</span>
        </div>
        <div className={s.circlebox}>
          <div className={s.circle}>
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
          </div>
          <span>{circleText}</span>
        </div>
      </div>
    </div>
  );
}
