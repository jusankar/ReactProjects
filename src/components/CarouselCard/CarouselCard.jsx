import s from "./style.module.css";
import Card from "./Card/Card";

export default function CarouselCard({ carouselItems }) {
  return (
    <div className={s.carousel}>
      <div className={s.container}>
        {carouselItems.map((item) => {
          return (
            <Card
              key={item.id}
              title={item.title}
              subTitles={item.subTitles}
              percentage={item.percentage}
              circleText={item.circleText}
            />
          );
        })}
      </div>
    </div>
  );
}
