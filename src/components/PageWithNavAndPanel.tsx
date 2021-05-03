import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";

const PageWithNavAndPanel = ({ children, pathName, context }) => {
  const [panelOpened, setPanelOpened] = useState(false);
  const togglePanel = () => setPanelOpened(!panelOpened);
  const closePanelIfOpened = () => {
    if (panelOpened) {
      setPanelOpened(false);
    }
  };

  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1024px)",
  });

  return (
    <div className="flex flex-row justify-center w-full">
      <div
        className={`z-10 w-full  ${
          panelOpened ? "opacity-25 cursor-pointer" : ""
        }`}
        onClick={() => closePanelIfOpened()}
      >
        <Topbar path={pathName} context={context} togglePanel={togglePanel} />
        <div className="flex flex-row justify-center mt-6">
          <div className="max-w-screen-lg">{children}</div>
        </div>
        {!isDesktop ? <Navbar path={pathName} /> : <></>}
      </div>
      <div
        className={`z-20 fixed inset-y-0 right-0 h-screen ${
          panelOpened ? "w-3/4" : "w-0"
        } dark:bg-dark-panel duration-500`}
      >
        <SidePanel />
      </div>
    </div>
  );
};

export default PageWithNavAndPanel;
