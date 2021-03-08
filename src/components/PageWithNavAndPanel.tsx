import React, { useState } from "react";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";

const PageWithNavAndPanel = ({ children, pathName }) => {
  const [panelOpened, setPanelOpened] = useState(false);
  const togglePanel = () => setPanelOpened(!panelOpened);
  const closePanelIfOpened = () => {
    if (panelOpened) {
      setPanelOpened(false);
    }
  };
  return (
    <>
      <div
        className={`z-10 ${panelOpened ? "opacity-25" : ""}`}
        onClick={() => closePanelIfOpened()}
      >
        <Topbar togglePanel={togglePanel} />
        <>{children}</>
        <Navbar path={pathName} />
      </div>
      <div
        className={`z-20 fixed inset-y-0 right-0 h-screen ${
          panelOpened ? "w-3/4" : "w-0"
        } dark:bg-dark-panel duration-500`}
      >
        <SidePanel />
      </div>
    </>
  );
};

export default PageWithNavAndPanel;
