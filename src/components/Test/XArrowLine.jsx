import s from "./style.module.css";

export default function XArrowLine() {
  const section1Value = 120; // Value for Section 1
  const section2Value = 120; // Value for Section 2
  const section3Value = 120; // Value for Section 3

  const totalValue = section1Value + section2Value + section3Value;

  const getSectionStyles = (value, index) => {
    const degrees = (value / totalValue) * 360;
    const rotate = `rotate(${degrees}deg)`;
    const color = index === 0 ? '#FF6384' : index === 1 ? '#36A2EB' : '#FFCE56';
    return {
      transform: rotate,
      borderTopColor: color,
      borderRightColor: color,
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
    };
  };

  return (
    // <div className={`${s.container}`} style={{ padding: "50px" }}>
    //   <svg viewBox="0 0 1000 1000">
    //     <circle
    //       cx="10"
    //       cy="10"
    //       r="10"
    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="none"
    //     />

    //     <circle
    //       cx="10"
    //       cy="50"
    //       r="10"
    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="none"
    //     />
    //     <circle
    //       cx="10"
    //       cy="100"
    //       r="10"
    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="none"
    //     />
    //     <circle
    //       cx="100"
    //       cy="10"
    //       r="10"
    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="none"
    //     />
    //     <circle
    //       cx="100"
    //       cy="50"
    //       r="10"
    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="none"
    //     />
    //     <circle
    //       cx="100"
    //       cy="100"
    //       r="10"
    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="none"
    //     />
    //     <circle
    //       cx="200"
    //       cy="10"
    //       r="10"
    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="none"
    //     />
    //     <circle
    //       cx="200"
    //       cy="50"
    //       r="10"
    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="red"
    //     />
    //     <circle
    //       cx="200"
    //       cy="100"
    //       r="10"
    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="none"
    //     />
    //     <path
    //       d="M 20,10 Q 35, 35 20,50"
    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="none"
    //     />
    //     <path
    //       d="M 20,10 Q 60, 60 20,100"
    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="none"
    //     />

    //     <path
    //       d="M 90,50 Q 70, 30 90,10"
    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="none"
    //     />
    //     <path
    //       d="M 90,100 Q 50, 55 90,10"
    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="none"
    //     />

    //     <path
    //       // d="M 210 50 Q 220 50, 220 40
    //       //    M 210 30 Q 220 30, 220 40
    //       //    M 200 40 Q 200 30, 210 30"
    //       // d="M 210 50 Q 220 50, 220 40 Q 220 30, 210 30 M 200 40 Q 200 30, 210 30"
    //       // d="M 200 40 Q 200 30, 210 30 Q 220 30, 220 40 Q 220 50, 210 50"
    //       d="M 210 50 Q 220 50, 220 40 Q 220 30, 210 30 Q 200 30, 200 40"

    //       // d="M 210 50 Q 220 50, 220 40 Q 220 30, 210 30 Q 200 30, 200 40 Q 200 50, 210 50"

    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="none"
    //     />

    //     <path
    //       d="M 110,50 Q150 50, 150 75 Q150 100 190,100"
    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="none"
    //     />

    //     {/* <circle
    //       cx="10"
    //       cy="10"
    //       r="10"
    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="none"
    //     />
    //     <path
    //       // d="M 20,10 A 30,30 0 0 0 10,0"
    //       d="M 20,10 10,0"
    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="none"
    //     /> */}
    //     {/* <circle
    //       cx="10"
    //       cy="30"
    //       r="10"
    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="none"
    //     />
    //     <circle
    //       cx="10"
    //       cy="50"
    //       r="10"
    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="none"
    //     />
    //     <path
    //       d="M 20,10 Q25,20 20,30"
    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="none"
    //     />
    //     <path
    //       d="M 20,10 Q35,30 20,50"
    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="none"
    //     />
    //     <path
    //       d="M 0,10 Q-5,20 0,30"
    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="none"
    //     />
    //      <path
    //       d="M 0,10 Q-15,30 0,50"
    //       stroke="red"
    //       strokeWidth="1.5"
    //       fill="none"
    //     /> */}
    //   </svg>
    // </div>
    <div>
      <div className={s.donutChart}>
        <div
          className={s.donutSection}
          style={getSectionStyles(section1Value, 0)}
        ></div>
        <div
          className={s.donutSection}
          style={getSectionStyles(section2Value, 1)}
        ></div>
        <div
          className={s.donutSection}
          style={getSectionStyles(section3Value, 2)}
        ></div>
      </div>
    </div>
  );
}
