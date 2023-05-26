import { useState } from "react";
import s from "./style.module.css";
import { InfoCircle as Info } from "react-bootstrap-icons";

export default function InformationBox({ title, detail }) {
  const [showToolTip, setShowToolTip] = useState(false);
  const handleMouseLeave = () => {
    setShowToolTip(false);
  };
  const handleClick = () => {
    setShowToolTip(true);
  };
  return (
    <div>
      <div className={s.title}>
        {title}
        <Info
          className={s.infoIcon}
          onClick={handleClick}
          onMouseLeave={handleMouseLeave}
        />
      </div>
      {showToolTip && (
        <div className={s.toolTip}>
          {detail}
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat
          minus, architecto beatae placeat quas qui commodi aliquid ducimus odit
          aperiam, ullam natus quo velit mollitia minima? Labore a modi illo.
        </div>
      )}
    </div>
  );
}
