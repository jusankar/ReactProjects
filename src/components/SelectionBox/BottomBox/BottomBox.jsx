import { ButtonList } from "../Button/ButtonList/ButtonList";
import s from "./style.module.css";

export function BottomBox({ dataItems, onBottomListItemClick }) {
  return (
    <div className={s.container}>
      {dataItems && (
        <ButtonList
          onItemClick={onBottomListItemClick}
          dataItems={dataItems}
        ></ButtonList>
      )}
    </div>
  );
}

