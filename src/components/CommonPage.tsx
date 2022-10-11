import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDarkMode } from "../utils/darkMode";
import { i18nContext } from "../utils/i18nContext";
import Navbar from "./Navbar";
import Notification from "./Notification";
import SidePanel from "./SidePanel";
import TopBar from "./TopBar";

type CommonPageProps = {
  children: any;
  page: string;
  faded?: boolean;
};

const CommonPage = ({ children, page, faded = false }: CommonPageProps) => {
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();
  const router = useRouter();
  const [panelOpened, setPanelOpened] = useState(false);
  const togglePanel = () => setPanelOpened(!panelOpened);
  const closePanelIfOpened = () => {
    if (panelOpened) {
      setPanelOpened(false);
    }
  };
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });

  return (
    <div className="flex flex-row justify-center w-full overflow-y-hidden">
      <div className="flex flex-col w-full">
        <div className={faded ? "opacity-25" : ""}>
          <TopBar togglePanel={togglePanel} />
        </div>
        <div
          className={`z-50 fixed inset-y-0 right-0 h-screen ${
            panelOpened ? "w-3/4" : "w-0"
          } bg-light-panel dark:bg-dark-panel duration-500`}
        >
          <SidePanel />
        </div>
        {!isDesktop && <Navbar />}
        <div
          className="flex flex-row justify-center"
          onClick={() => closePanelIfOpened()}
        >
          <div className="flex flex-col justify-center bg-light-med dark:bg-dark-med w-full">
            <div className="flex flex-row justify-center w-full my-1 bg-light-light dark:bg-dark-dark">
              <div
                className={`flex flex-row max-w-screen-xl w-full p-6 ${
                  faded ? "opacity-25" : ""
                }`}
              >
                <button onClick={() => router.back()}>
                  <Image
                    src={`/icons/${darkMode ? "dark" : "light"}/back-arrow.svg`}
                    alt={"back"}
                    width="16"
                    height="16"
                  />
                </button>
                <h1 className="ml-10 text-xl">
                  {t(`commonPageNav.${page}`) || page}
                </h1>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default CommonPage;
