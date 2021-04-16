import React, { useRef, useState } from "react";
import styles from "./Radar.module.css";

const oneToFive = [1, 2, 3, 4, 5];

export type RadarData = {
  x: number;
  y: number;
  weight?: number;
  names: string[];
};

export type PointsCoords = {
  x: number;
  y: number;
};

export type RadarDrawData = {
  limits: {
    start: PointsCoords;
    end: PointsCoords;
  };
};

const floatEq = (a: number, b: number) => a - b >= 0.5 || b - a >= 0.5;

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
  const container = useRef(null);
  return (
    <div
      className={`flex flex-col${y === "bot" ? "-reverse" : ""} h-full w-full`}
      ref={container}
    >
      <div className="w-full h-4/5">
        <div
          className={`w-11/12 h-5/6 m-3 border-b-2 border-${
            x === "left" ? "r" : "l"
          }-2 border-dark-red border-dashed`}
        >
          {oneToFive.map((i) => (
            <div className="flex flex-row w-full h-1/5" key={`${i}`}>
              {oneToFive.map((k) => (
                <div
                  key={`${i}-${k}`}
                  className="flex flex-col w-1/5 h-full border border-dashed border-opacity-25 border-dark-radargrid "
                >
                  {(() => {
                    const filteredCircles = data.filter(
                      (row) =>
                        6 - Math.floor(row.x) === i &&
                        Math.floor(row.y) + 1 === k
                    );
                    if (filteredCircles.length <= 0) {
                      return <></>;
                    }
                    const circle = filteredCircles.reduce(
                      (previous, current) => ({
                        ...previous,
                        weight: (previous.weight || 8) + 1,
                        names: [...previous.names, ...current.names],
                      })
                    );
                    const xDetail =
                      -4 + Math.floor(Number((circle.x % 1).toFixed(1)) * 9);
                    const yDetail =
                      -4 + Math.floor(Number((circle.x % 1).toFixed(1)) * 13);
                    return (
                      <div
                        className={`
                          flex flex-col 
                          ${styles.circle} relative text-dark-med ${
                          xDetail < 0 ? "-" : ""
                        }top-${Math.abs(xDetail)} ${
                          yDetail < 0 ? "-" : ""
                        }left-${Math.abs(
                          yDetail
                        )} rounded-full text-center text-xs pt-${
                          (circle.weight || 10) - 8
                        } h-${circle.weight || 8} w-${
                          circle.weight || 8
                        } gradient-${color}`} // (-4; -4) (5, 9)
                      >
                        {circle.names.join(",")}
                      </div>
                    );
                  })()}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-1/5">Title</div>
    </div>
  );
};

export default Radar;
