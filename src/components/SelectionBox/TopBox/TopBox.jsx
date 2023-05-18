import { ButtonList } from "../Button/ButtonList/ButtonList";

function TopBox({ dataItems, onTopListItemClick }) {
  return (
    <div>
      {dataItems && (
        <ButtonList
          onItemClick={onTopListItemClick}
          dataItems={dataItems}
        ></ButtonList>
      )}
    </div>
  );
}

export default TopBox;
