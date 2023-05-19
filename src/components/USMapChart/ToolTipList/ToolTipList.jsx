import s from "./style.module.css";

export default function ToolTipList({ feature }) {
  return (
    <div className={s.toolTipCount}>
      {feature.properties.ToolTip &&
        feature.properties.ToolTip.map((tip) => (
          <div key={feature.properties.AFFGEOID+tip.name}>
            <div>{tip.name}: </div>
            <div>{tip.value}</div>
          </div>
        ))}
    </div>
  );
}
