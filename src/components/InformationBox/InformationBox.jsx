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
        {detail && (
          <Info
            className={s.infoIcon}
            onClick={handleClick}
            onMouseLeave={handleMouseLeave}
          />
        )}
      </div>
      {detail && showToolTip && <div className={s.toolTip}>{detail}</div>}
    </div>
  );
}
