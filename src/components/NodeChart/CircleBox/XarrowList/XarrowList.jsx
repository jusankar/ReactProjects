// import s from "./style.module.css";
import Xarrow from "react-xarrows";

export default function XarrowList({ start, end }) {
  console.log(start);
  return (
    <>
      <Xarrow
        color="white"
        strokeWidth={2}
        path="smooth"
        start={start}
        end={end}
        curveness={0.5}
        // animateDrawing={0.5} 
        // startAnchor={["left", { position: "center",  rotation:-45}]}
        // endAnchor={["bottom", { position: "center", rotation:-45 }]}
      />
    </>
  );
}
