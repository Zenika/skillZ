import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { i18nContext } from "../utils/i18nContext";
import Topbar from "./Topbar";

type CommonPageProps = {
  children: any;
  page: string | string[];
  faded: boolean;
};

const CommonPage = ({ children, page, faded }: CommonPageProps) => {
  const { t } = useContext(i18nContext);
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1024px)",
  });

  return (
    <div className="flex flex-row justify-center w-full overflow-y-hidden">
      <div className="flex flex-col w-full">
        {isDesktop ? (
          <div className={faded ? "opacity-25" : ""}>
            <Topbar path={""} togglePanel={() => {}} />
          </div>
        ) : (
          <></>
        )}
        <div className="flex flex-row justify-center">
          <div className="flex flex-col justify-center dark:bg-dark-med w-full">
            <div className="flex flex-row justify-center w-full my-1 dark:bg-dark-dark">
              <div
                className={`flex flex-row max-w-screen-lg w-full p-6 ${
                  faded ? "opacity-25" : ""
                }`}
              >
                <Link href="/">
                  <div className="p-1">
                    <Image src="/icons/back-arrow.svg" width="16" height="16" />
                  </div>
                </Link>
                <h1 className="ml-10 text-xl">{t(`commonPageNav.${page}`)}</h1>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonPage;
