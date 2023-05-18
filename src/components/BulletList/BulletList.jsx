import s from "./style.module.css";

export default function BulletList({ data }) {
  return (
    <div className={s.container} >
      <ul className={s.listContent}>
        {data.map((itm) => {
          return (
            <li key={itm.id} className={s.listItem}>
              {itm.value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
