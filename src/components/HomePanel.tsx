import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useDarkMode } from "../utils/darkMode";
import { i18nContext } from "../utils/i18nContext";
import styles from "./HomePanel.module.css";
import Radar from "./Radar";
import { FaTrophy } from "react-icons/fa";

type HomePanelProps = {
  props: {
    x: string;
    y: string;
    context: string;
    color: string;
    name: string;
    count: number;
    data: {
      x: number;
      y: number;
      weight: number;
      labels: string[];
      name: string;
    }[];
    certifs: number;
  };
};

const HomePanel = ({
  props: { x, y, context, color, name, count, data, certifs },
}: HomePanelProps) => {
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });

  const roundTable = {
    top: {
      left: "rounded-tl-2xl",
      right: "rounded-tr-2xl",
    },
    bot: {
      left: "rounded-bl-2xl",
      right: "rounded-br-2xl",
    },
  };

  const colorTable = {
    green: "text-light-green dark:text-dark-green",
    red: "text-light-red dark:text-dark-red",
    blue: "text-light-blue dark:text-dark-blue",
    yellow: "text-light-yellow dark:text-dark-yellow",
  };

  const widthTable = {
    desktop: {
      0: "w-15",
      1: "w-13",
      2: "w-11",
      3: "w-9",
      4: "w-7",
    },
    mobile: {
      0: "w-12",
      1: "w-10",
      2: "w-8",
      3: "w-6",
      4: "w-4",
    },
  };

  return (
    <Link
      href={{
        pathname: `/skills/${context}/${name}`,
        query: !data.length && context === "mine" && { add: true },
      }}
    >
      <div
        className={`flex flex-auto cursor-pointer flex-col bg-light-panel dark:bg-dark-panel ${
          !isDesktop ? "min-h-homePanel-mobile" : "min-h-homePanel"
        } ${y && x ? roundTable[y][x] : ""} m-1 w-2/5`}
      >
        <div
          className={`flex flex-auto ${
            x === "right" ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`flex flex-auto flex-col ${isDesktop ? "w-2/5" : ""}`}
          >
            {data.length > 0 ? (
              <div
                className={`flex flex-auto justify-around py-4 text-4xl h-1/3 ${
                  y === "bot" ? "order-11" : "order-1"
                }`}
              >
                {certifs > 0 ? (
                  <div
                    className={`text-lg text-center text-light-graytext dark:text-dark-graytext ${
                      styles.certifs
                    } ${x === "right" ? "order-last" : ""}`}
                  >
                    {certifs}
                  </div>
                ) : (
                  <div className={x === "right" ? "order-last" : ""}> </div>
                )}
                <div>{count}</div>
              </div>
            ) : (
              <div
                className={`flex flex-auto flex-row justify-center py-4 h-1/3 ${
                  y === "bot" ? "order-11" : "order-1"
                }`}
              >
                {context !== "mine" ? (
                  <div style={{ width: 48, height: 48 }}></div>
                ) : (
                  <Image
                    src={`/icons/${darkMode ? "dark" : "light"}/add-skill.svg`}
                    alt={"add"}
                    width="48"
                    height="48"
                  />
                )}
              </div>
            )}
            {data.length > 0 ? (
              <div
                className={`flex flex-auto flex-col justify-around py-4 px-2 order-6 h-1/3`}
              >
                <div
                  className={`mb-2 ${colorTable[color]} flex items-center ${
                    x === "right" && "justify-end"
                  } ${!isDesktop && "text-sm"}`}
                >
                  <FaTrophy className={`mr-2`} />
                  {t("home.bestSkills")}
                </div>
                {(!isDesktop ? [0, 1, 2] : [0, 1, 2, 3, 4]).map((i) => (
                  <div
                    key={i}
                    className="flex flex-auto flex-row justify-between"
                  >
                    <div
                      className={`${x === "right" ? "order-last" : ""} ${
                        x === "right" ? "text-right" : "text-left"
                      } font-bold ${
                        data[i]
                          ? `${
                              widthTable[isDesktop ? "desktop" : "mobile"][i]
                            } gradient-${color}`
                          : ""
                      } ${
                        x === "right" ? "rounded-l-2xl" : "rounded-r-2xl"
                      } h-6 m-0.5 text-light-light p-0.5`}
                    >
                      {data[i] ? i + 1 : ""}
                    </div>
                    <span className="px-2 overflow-clip">
                      {data[i]?.name ?? ""}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-auto flex-row justify-center py-4 px-2 order-6 h-1/3">
                <p className="text-center">
                  {context !== "mine" ? t("home.noSkill") : t("home.addSkill")}
                </p>
              </div>
            )}
            <div
              className={`flex flex-auto ${
                x === "left" ? "justify-end" : "justify-start"
              } flex-row py-4 px-1 h-1/3 ${
                y === "bot" ? "order-1" : "order-12"
              }`}
            >
              <span
                className={`text-xl px-2 w-full ${
                  x === "left" ? "text-right" : "text-left"
                } ${colorTable[color]}`}
              >
                {isDesktop ? "" : t(`home.${name}`)}
              </span>
            </div>
          </div>

          {isDesktop && (
            <div className={`flex flex-auto flex-col w-3/5 h-full`}>
              <Radar
                x={x}
                y={y}
                data={data}
                color={color}
                title={t(`home.${name}`)}
              />
            </div>
          )}
        </div>

        <div
          className={`gradient-${color} ${
            y === "bot" ? "order-first" : "order-last"
          } h-0.5`}
        ></div>
      </div>
    </Link>
  );
};

export default HomePanel;
