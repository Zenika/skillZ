import Image from "next/image";
import React from "react";
import { useDarkMode } from "../utils/darkMode";

const Loading = () => {
  const { darkMode } = useDarkMode();

  return (
    <section
      className={`${
        darkMode ? "bg-dark-dark" : "bg-light-ultrawhite"
      } relative place-items-center grid h-screen w-screen gap-4`}
    >
      <div className="bg-dark-red w-48 h-48  absolute animate-ping rounded-full delay-5s shadow-xl"></div>
      <div className="bg-dark-red w-32 h-32 absolute animate-ping rounded-full shadow-xl"></div>
      <div className="bg-dark-red w-28 h-28 absolute animate-pulse rounded-full shadow-xl"></div>
      <Image
        src={`/icons/${darkMode ? "dark" : "light"}/logo.svg`}
        alt={"Logo"}
        height="35"
        width="105"
      />
    </section>
  );
};

export default Loading;
