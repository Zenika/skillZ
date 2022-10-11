import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import FilterByPanel, { Filter } from "./FilterByPanel";
import Navbar from "./Navbar";
import Notification from "./Notification";
import SidePanel from "./SidePanel";
import TopBar from "./TopBar";

const PageWithNavAndPanel = ({
  children,
  pathName,
  context,
  filters,
}: {
  children: any;
  pathName: string;
  context: string | string[];
  filters?: Filter[];
}) => {
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
        <div className="flex flex-row justify-center mt-6">
          <div className="flex flex-col w-full max-w-screen-xl">
            <div className="mx-4">
              {filters ? (
                <div className="mx-4">
                  <FilterByPanel filters={filters} />
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="max-w-screen-xl">{children}</div>
          </div>
        </div>
        {!isDesktop ? <Navbar path={pathName} /> : <></>}
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

export default PageWithNavAndPanel;
