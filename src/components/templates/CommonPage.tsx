import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";
import { i18nContext } from "../../utils/i18nContext";
import Button from "../atoms/Button";
import Notification from "../atoms/Notification";
import Navbar from "../molecules/Navbar";
import SidePanel from "../organisms/SidePanel";
import TopBar from "../organisms/TopBar";

type CommonPageProps = {
  children: any;
  page: string;
  backBar?: boolean;
};

const CommonPage = ({ children, page, backBar = true }: CommonPageProps) => {
  const { t } = useContext(i18nContext);
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
    <div className="flex flex-row justify-center w-full">
      <div
        className={`z-10 w-full  ${
          panelOpened ? "opacity-25 cursor-pointer" : ""
        }`}
        onClick={() => closePanelIfOpened()}
      >
        <TopBar togglePanel={togglePanel} />
        <div
          className="flex flex-row justify-center mb-5"
          onClick={() => closePanelIfOpened()}
        >
          <div className="flex flex-col justify-center bg-light-med dark:bg-dark-med w-full">
            {backBar && (
              <div className="flex flex-row justify-center w-full my-1 bg-light-dark dark:bg-dark-dark">
                <div className="flex flex-row items-stretch space-x-4 max-w-screen-xl w-full p-6">
                  <Button
                    type={"primary"}
                    callback={() => router.back()}
                    icon={<AiOutlineArrowLeft color="white" />}
                  ></Button>

                  <h1 className="text-xl self-center">
                    {t(`commonPageNav.${page}`) || page}
                  </h1>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-center mt-6">
          <div className="flex flex-col w-full max-w-screen-xl">
            <div className="max-w-screen-xl">{children}</div>
          </div>
        </div>
        {!isDesktop && <Navbar />}
      </div>
      <div
        className={`z-20 fixed inset-y-0 right-0 h-screen ${
          panelOpened ? "w-3/4" : "w-0"
        } bg-light-panel dark:bg-dark-panel duration-500`}
      >
        <SidePanel />
      </div>
      <Notification />
    </div>
  );
};

export default CommonPage;
