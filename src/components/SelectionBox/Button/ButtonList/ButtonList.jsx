import ButtonItem from "../ButtonItem/ButtonItem";
import s from "./style.module.css";
export function ButtonList({ dataItems, onItemClick }) {
  return (
    <div className={s.container}>
      {dataItems.map((item) => {
        return <ButtonItem onClick={onItemClick} key={item.id} item={item} />;
      })}
    </div>
  );
}
