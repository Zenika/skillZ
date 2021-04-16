import React, { useEffect, useRef, useState } from "react";
import styles from "./Radar.module.css";

const oneToFive = [1, 2, 3, 4, 5];

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
        paddingTop: `${
          data.weight === 20 ? data.weight / 10 : data.weight / 5
        }px`,
      }}
      className={`${styles.circle} z-${
        Math.floor(Math.random() * 10) * 10
      } absolute text-dark-med rounded-full text-center text-xs gradient-${color}`}
    >
      {data.labels.join(",")}
    </div>
  );
};

const RadarCell = () => {
  return (
    <div className="w-1/5 h-full border border-dashed border-opacity-25 border-dark-radargrid "></div>
  );
};

const RadarRow = ({ i }: { i: number }) => {
  return (
    <div className="flex flex-row w-full h-1/5">
      {oneToFive.map((k) => (
        <RadarCell key={`${i}-${k}`} />
      ))}
    </div>
  );
};

const Radar = ({
  data,
  x,
  y,
  color,
}: {
  data: RadarData[];
  x: string;
  y: string;
  color: string;
}) => {
  const radar = useRef(null);
  const [circles, setCircles] = useState<RadarData[]>([]);
  useEffect(() => {
    if (!radar.current) {
      return;
    }
    setCircles(
      data
        .filter((row, i) => {
          return i < 5;
        })
        .map((row, _, array) => {
          return array
            .filter(
              (arrayRow) =>
                Math.abs(arrayRow.x - row.x) <= arrayRow.weight / 100
            )
            .reduce((prev, curr) => ({
              ...prev,
              labels: [...prev.labels, ...curr.labels],
              weight: prev.weight + 10,
            }));
        })
        .reduce(
          (unique, item) =>
            unique.find(
              (arrayRow) =>
                Math.abs(arrayRow.x - item.x) <= arrayRow.weight / 100
            )
              ? unique
              : [...unique, item],
          []
        )
        .map((row) => {
          console.log("============");
          console.log("x", row.x / 5);
          console.log(radar.current.offsetWidth);
          console.log("y", row.y / 5);
          console.log(radar.current.offsetHeight);
          return row;
        })
        .map((circle) => ({
          ...circle,
          x: radar.current.offsetWidth * (circle.x / 5),
          y: radar.current.offsetHeight * (circle.y / 5),
        }))
    );
  }, [radar]);
  return (
    <div
      className={`flex flex-col${y === "bot" ? "-reverse" : ""} h-full w-full`}
    >
      <div className="w-full h-4/5">
        <div
          ref={radar}
          className={`w-11/12 h-5/6 m-3 border-b-2 border-${
            x === "left" ? "r" : "l"
          }-2 border-dark-red border-dashed`}
        >
          {oneToFive.map((i) => (
            <RadarRow key={i} i={i} />
          ))}
          <div className="absolute">
            {circles.map((circle, i) => (
              <Circle key={i} color={color} data={circle} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-1/5">Title</div>
    </div>
  );
};

export default Radar;
