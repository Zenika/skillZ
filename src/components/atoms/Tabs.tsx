import React from "react";
import { TabProps } from "./Tab";

type TabsProps = {
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
};

const Tabs = ({ children }: TabsProps) => {
  return (
    <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400 dark:border-gray-700 mb-8">
      <div className={"flex"}>{children}</div>
    </div>
  );
};

export default Tabs;
