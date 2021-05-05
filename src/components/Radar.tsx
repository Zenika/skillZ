import { useEffect, useRef, useState } from "react";
import styles from "./Radar.module.css";

const oneToSix = [1, 2, 3, 4, 5, 6];

export type RadarData = {
  x: number;
  y: number;
  weight: number;
  labels: string[];
};

const Circle = ({ data, color }: { data: RadarData; color: string }) => {
  return (
    <div
      style={{
        bottom: `${data.y - data.weight / 2}px`,
        left: `${data.x - data.weight / 2}px`,
        width: `${data.weight}px`,
        height: `${data.weight}px`,
      }}
      className={`${styles.circle} flex flex-col justify-center absolute rounded-full text-center text-xs gradient-${color}`}
    >
      <div className="flex flex-row justify-center">
        <span
          className={`text-dark-med overflow-clip ${
            data.weight > 30 ? "p-1" : ""
          }`}
        >
          {data.labels.join(", ")}
        </span>
      </div>
    </div>
  );
};

const RadarCell = ({
  first,
  isFullSize,
}: {
  first: boolean;
  isFullSize: boolean;
}) => {
  return (
    <div className="flex flex-col justify-between w-1/6 h-full border border-dashed border-opacity-25 border-dark-radargrid ">
      {first && isFullSize ? <span className="rotated">Appetite</span> : <></>}
      {first && isFullSize ? <span className="ml-2">Desire</span> : <></>}
    </div>
  );
};

const RadarRow = ({ i, isFullSize }: { i: number; isFullSize: boolean }) => {
  return (
    <div className="flex flex-row w-full h-1/6">
      {oneToSix.map((k) => (
        <RadarCell
          key={`${i}-${k}`}
          first={k === 1 && i === 6}
          isFullSize={isFullSize}
        />
      ))}
    </div>
  );
};

const Radar = ({
  data,
  x,
  y,
  color,
  title,
  faded,
}: {
  data: RadarData[];
  x: string;
  y: string;
  color: string;
  title: string;
  faded?: boolean;
}) => {
  const radar = useRef(null);
  const [resized, setResized] = useState(false);
  const [circles, setCircles] = useState<RadarData[]>([]);
  const isFullSize = title === "";
  useEffect(() => {
    if (!window) {
      return;
    }
    window.addEventListener("resize", () => setResized(true));
  }, [window]);
  useEffect(() => {
    setResized(false);
    if (!radar.current) {
      return;
    }
    setCircles(
      data
        .filter((row, i) => {
          return title === "" ? i < 15 : i < 5;
        })
        .map((row, _, array) => {
          return array
            .filter(
              (arrayRow) =>
                Math.abs(arrayRow.x - row.x) + Math.abs(arrayRow.y - row.y) <=
                arrayRow.weight / 100
            )
            .reduce((prev, curr) => ({
              ...prev,
              labels: [...prev.labels, ...curr.labels],
              weight:
                prev.weight +
                (prev.weight > 50 ? curr.weight / 5 : curr.weight / 3),
            }));
        })
        .reduce(
          (unique, item) =>
            unique.find(
              (arrayRow) =>
                Math.abs(arrayRow.x - item.x) + Math.abs(arrayRow.y - item.y) <=
                arrayRow.weight / 100
            )
              ? unique
              : [...unique, item],
          []
        )
        .map((circle) => ({
          ...circle,
          x: radar.current.offsetWidth * (circle.x / 6),
          y: radar.current.offsetHeight * (circle.y / 6),
        }))
    );
  }, [radar, data, resized]);
  return (
    <div
      className={`flex flex-col${y === "bot" ? "-reverse" : ""} h-full w-full ${
        faded ? "opacity-25" : ""
      }`}
    >
      <div className="w-full h-4/5">
        <div
          ref={radar}
          className={`${
            title === "" ? "w-radar h-radar" : "w-11/12 h-5/6"
          } m-3 max-w-radar max-h-radar border-b-2 border-${
            x === "left" ? "r" : "l"
          }-2 border-dark-red border-dashed`}
        >
          {oneToSix.map((i) => (
            <RadarRow key={i} i={i} isFullSize={isFullSize} />
          ))}
          <div className="absolute">
            {circles.map((circle, i) => (
              <Circle key={i} color={color} data={circle} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-1/5">
        <div
          className={`flex flex-auto justify-${
            x === "left" ? "end" : "start"
          } flex-row py-4 px-1 h-1/3 ${y === "bot" ? "order-1" : "order-12"}`}
        >
          <span
            className={`text-xl px-2 w-full text-${
              x === "left" ? "right" : "left"
            } text-dark-${color}`}
          >
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Radar;
