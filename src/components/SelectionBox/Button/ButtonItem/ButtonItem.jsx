import s from "./style.module.css";

function ButtonItem({ item, onClick }) {
  const onItemClick = () => {
    onClick(item);
  };
  return (
    <button
      onClick={onItemClick}
      className={`${s.btn} ${item.enable ? s.btn_enable : s.btn_disabled}`}
    >
      {item.name}
    </button>
  );
}

export default ButtonItem;
