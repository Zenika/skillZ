import Link from "next/link";
import React from "react";
import { UrlObject } from "url";

export type TabProps = {
  current: boolean;
  href: string | UrlObject;
  title: string;
};

export const tabClasses = {
  base: "w-full inline-block p-4 rounded-t-lg border-transparent",
  hover: "hover:bg-light-dark hover:dark:bg-dark-radargrid",
  border: "border-b-2 border-dark-red",
};

const Tab = ({ current, href, title }: TabProps) => {
  return (
    <div className="grow cursor-pointer">
      <Link href={href}>
        <div
          className={`${tabClasses.base} ${tabClasses.hover} ${
            current && tabClasses.border
          }`}
        >
          {title}
        </div>
      </Link>
    </div>
  );
};

export default Tab;
