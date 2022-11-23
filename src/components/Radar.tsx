import { useContext, useEffect, useRef, useState } from "react";
import { i18nContext } from "../utils/i18nContext";
import { MdKeyboardArrowUp, MdOutlineKeyboardArrowRight } from "react-icons/md";

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
    if (data.weight > 50) setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div
      style={{
        bottom: `${data.y - (isHovering ? data.weight + 180 : 50) / 2}px`,
        left: `${data.x - (isHovering ? data.weight + 180 : 50) / 2}px`,
        width: `${isHovering ? data.weight + 180 : 50}px`,
        height: `${isHovering ? data.weight + 180 : 50}px`,
        zIndex: `${isHovering ? "999" : "1"}`,
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={`flex flex-col justify-center absolute rounded-full text-center text-s gradient-${color}`}
    >
      <div className="flex flex-row justify-center">
        <span
          className={`text-light-light font-bold overflow-clip ${
            data.weight > 30 && isHovering && "p-4"
          }`}
        >
          {!isHovering && data.weight > 30 && `+${data.labels.length}`}
          {!isHovering && data.weight < 30 && data.labels.join(", ")}
          {isHovering && data.labels.join(", ")}
        </span>
      </div>
    </div>
  );
};

const RadarCell = ({
  x,
  y,
  isFullSize,
}: {
  x: number;
  y: number;
  isFullSize: boolean;
}) => {
  const { t } = useContext(i18nContext);
  return (
    <div
      style={{
        border: "1px dashed black",
        borderBottom: y === 6 ? "3px solid black" : "1px dashed black",
        borderLeft: x === 1 ? "3px solid black" : "1px dashed black",
      }}
      className={`flex flex-col ${
        isFullSize ? "justify-between" : "justify-end"
      } w-1/6 h-full border-opacity-25 border-light-radargrid dark:border-dark-radargrid`}
    >
      {x === 1 && y === 6 && (
        <span
          className={`rotated whitespace-nowrap ${!isFullSize && "text-xs"}`}
        >
          {t("radar.desire")}
        </span>
      )}
      {x === 1 && y === 6 && (
        <span className={`ml-2 whitespace-nowrap ${!isFullSize && "text-xs"}`}>
          {t("radar.level")}
        </span>
      )}
    </div>
  );
};

const RadarRow = ({ i, isFullSize }: { i: number; isFullSize: boolean }) => {
  return (
    <div className="flex flex-row w-full h-1/6">
      {oneToSix.map((k) => (
        <RadarCell key={`${i}-${k}`} x={k} y={i} isFullSize={isFullSize} />
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
    yellow: "text-light-yellow dark:text-dark-yellow",
  };
  useEffect(() => {
    if (!window) {
      return;
    }
    window.addEventListener("resize", () => setResized(true));
  }, []);
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
        // As far as I understand, this reduce function aims to group skill on the same levels into one circles. So I suggest doing this comparing their x and y
        .reduce((unique, item) => {
          return unique.find(
            (arrayRow) => arrayRow.x === item.x && arrayRow.y === item.y
          )
            ? unique
            : [...unique, item];
        }, [])
        .map((circle) => ({
          ...circle,
          x: radar.current.offsetWidth * (circle.x / 6),
          y: radar.current.offsetHeight * (circle.y / 6),
        }))
    );
  }, [radar, data, resized, title]);

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
          } m-3 max-w-radar max-h-radar relative`}
        >
          <span
            className={`absolute -right-1.5 -bottom-1.5 scale-150 opacity-30`}
          >
            <MdOutlineKeyboardArrowRight />
          </span>
          <span className={`absolute -left-1.5 -top-2 scale-150 opacity-30`}>
            <MdKeyboardArrowUp />
          </span>
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
