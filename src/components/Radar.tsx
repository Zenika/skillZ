import { useContext, useEffect, useRef, useState } from "react";
import { i18nContext } from "../utils/i18nContext";
import styles from "./Radar.module.css";

const oneToSix = [1, 2, 3, 4, 5, 6];

export type RadarData = {
  x: number;
  y: number;
  weight: number;
  labels: string[];
};

const Circle = ({ data, color }: { data: RadarData; color: string }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    if (data.weight > 60) setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div
      style={{
        bottom: `${data.y - (isHovering ? data.weight + 70 : 50) / 2}px`,
        left: `${data.x - (isHovering ? data.weight + 70 : 50) / 2}px`,
        width: `${isHovering ? data.weight + 70 : 50}px`,
        height: `${isHovering ? data.weight + 70 : 50}px`,
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={`${styles.circle} flex flex-col justify-center absolute rounded-full text-center text-xs gradient-${color}`}
    >
      <div className="flex flex-row justify-center">
        <span
          className={`text-light-greytext dark:text-dark-med overflow-clip ${
            data.weight > 30 ? "p-4" : ""
          }`}
        >
          {!isHovering && `${data.labels.length}`}
          {isHovering && data.labels.join(", ")}
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
  const { t } = useContext(i18nContext);
  return (
    <div className="flex flex-col justify-between w-1/6 h-full border border-dashed border-opacity-25 border-light-radargrid dark:border-dark-radargrid">
      {first && isFullSize ? (
        <span className="rotated">{t("radar.desire")}</span>
      ) : (
        <></>
      )}
      {first && isFullSize ? (
        <span className="ml-2">{t("radar.level")}</span>
      ) : (
        <></>
      )}
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
  const colorTable = {
    green: "text-light-green dark:text-dark-green",
    red: "text-light-red dark:text-dark-red",
    blue: "text-light-blue dark:text-dark-blue",
    cyan: "text-light-cyan dark:text-dark-cyan",
  };
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
      (title !== ""
        ? data.filter((row, i) => {
            return i < 5;
          })
        : data
      )
        .map((row, _, array) => {
          return array
            .filter(
              (arrayRow) =>
                Math.abs(arrayRow.x - row.x) + Math.abs(arrayRow.y - row.y) <=
                arrayRow.weight / 200
            )
            .reduce((prev, curr) => ({
              ...prev,
              labels: [...prev.labels, ...curr.labels],
              weight:
                prev.weight +
                (prev.weight > 50 ? curr.weight / 10 : curr.weight / 3),
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
  console.log("title !== ", title);
  return (
    <div
      className={`flex ${
        y === "bot" ? "flex-col-reverse" : "flex-col"
      } h-full w-full ${faded ? "opacity-25" : ""}`}
    >
      <div className="w-full h-4/5">
        <div
          ref={radar}
          className={`${
            title === "" ? "w-radar h-radar" : "w-11/12 h-5/6"
          } m-3 max-w-radar max-h-radar border-b-2 ${
            x === "left" ? "border-r-2" : "border-l-2"
          } border-dark-red border-dashed`}
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
          className={`flex flex-auto ${
            x === "left" ? "justify-end" : "justify-start"
          } flex-row py-4 px-1 h-1/3 ${y === "bot" ? "order-1" : "order-12"}`}
        >
          <span
            className={`text-xl px-2 w-full ${
              x === "left" ? "text-right" : "text-left"
            } ${colorTable[color]}`}
          >
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Radar;
