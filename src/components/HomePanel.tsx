import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { i18nContext } from "../utils/i18nContext";
import styles from "./HomePanel.module.css";

type HomePanelProps = {
  props: {
    x: string;
    y: string;
    color: string;
    name: string;
    data: string[];
    certifs: number;
  };
};

const HomePanel = ({
  props: { x, y, color, name, data, certifs },
}: HomePanelProps) => {
  const { t } = useContext(i18nContext);
  return (
    <Link href={`/skills/mine/${name}${data.length <= 0 ? "/add" : ""}`}>
      <div
        className={`flex flex-auto flex-col dark:bg-dark-panel rounded-${
          y === "top" ? "t" : "b"
        }${x === "left" ? "l" : "r"}-2xl m-1 w-2/5`}
      >
        {data.length > 0 ? (
          <div
            className={`flex flex-auto justify-around py-4 text-4xl h-1/3 ${
              y === "bot" ? "order-11" : "order-1"
            }`}
          >
            {certifs > 0 ? (
              <div
                className={`text-lg text-center text-dark-med ${
                  styles.certifs
                } ${x === "right" ? "order-last" : ""}`}
              >
                {certifs}
              </div>
            ) : (
              <div className={x === "right" ? "order-last" : ""}> </div>
            )}
            <div>{data.length > 0 ? data.length : ""}</div>
          </div>
        ) : (
          <div
            className={`flex flex-auto flex-row justify-center py-4 h-1/3 ${
              y === "bot" ? "order-11" : "order-1"
            }`}
          >
            <Image src="/icons/add-skill.svg" width="48" height="48" />
          </div>
        )}
        {data.length > 0 ? (
          <div
            className={`flex flex-auto flex-col justify-around py-4 order-6 h-1/3`}
          >
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-auto flex-row justify-between">
                <div
                  className={`${x === "right" ? "order-last" : ""} text-${x} ${
                    data[i] ? `w-${20 - i * 4} gradient-${color}` : ""
                  } rounded-${
                    x === "right" ? "l" : "r"
                  }-2xl h-6 m-0.5 text-dark-med p-0.5`}
                >
                  {data[i] ? i + 1 : ""}
                </div>
                <div className="px-2 truncate">{data[i] ?? ""}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-auto flex-row justify-center py-4 order-6 h-1/3">
            <p className="text-center">{t("home.addSkill")}</p>
          </div>
        )}
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
            {t(`home.${name}`)}
          </span>
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
