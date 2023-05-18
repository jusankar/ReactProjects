import s from "./style.module.css";

export default function ArrowButton({ Text }) {
  return (
    <div>
      <button className={s.button}>{Text}</button>
    </div>
  );
}
