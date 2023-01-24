import React, { useContext, useState } from "react";
import { i18nContext } from "../../../utils/i18nContext";
import Button from "../Button";
import Image from "next/image";
import { useRef } from "react";
import { useEffect } from "react";

const TopBar = ({ demoParent, setDemoParent }) => {
  const { t } = useContext(i18nContext);
  const childRef = useRef();
  //change this with parameter
  const [openDemo, setOpenDemo] = useState(true);

  useEffect(() => {
      if (openDemo)
        localStorage.setItem("demo", "true")
    else 
        localStorage.setItem("demo", "false")
  }, [openDemo, setOpenDemo])

  const openDemoHandler = () => {
    setOpenDemo(true)
  };

  const closeDemoHandler = () => {
    setOpenDemo(false)
  }

  return (
    <div className="flex justify-between mb-4 p-2 w-full gradient-red-faded rounded">
      <div className="flex flex-row">
        <Image
          className="w-16 h-16 rounded-full"
          height="64"
          width="64"
          src={"/../public/fusee.png"}
          alt={"logoTutorial"}
        />
        <div className="flex flex-col mx-4 justify-center">
          <p className="">{t("onboarding.home.welcome")}</p>
          <p className="opacity-70">{t("onboarding.home.remind")}</p>
        </div>
      </div>
      <div className="flex">
        {!openDemo ? (
          <Button type={"secondary"} callback={openDemoHandler}>
            {t("onboarding.home.startTutorial")}
          </Button>
        ) : (
          <Button type={"secondary"} callback={closeDemoHandler}>
            {t("onboarding.home.stopTutorial")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default TopBar;
