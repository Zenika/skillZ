import { withAuthenticationRequired } from "@auth0/auth0-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useSwipeable } from "react-swipeable";
import Topbar from "../components/Topbar";
import { useDarkMode } from "../utils/darkMode";
import { i18nContext } from "../utils/i18nContext";
import styles from "./onboarding.module.css";

const onboardingPages = [
  {
    image: "/img/onboarding-addSkills.svg",
    name: "addSkillsDescription",
    alt: "Ajout d'un skill",
  },
  {
    image: "/img/onboarding-discoverZenikaSkills.svg",
    name: "discoverZenikaSkillsDescription",
  },
];

const Onboarding = () => {
  const { t } = useContext(i18nContext);
  const { darkMode } = useDarkMode();
  const { push } = useRouter();
  const [cardNumber, setCardNumber] = useState(0);
  const swipeHandlers = useSwipeable({
    onSwipedRight: () => {
      if (cardNumber > 0) {
        setCardNumber(cardNumber - 1);
      } else {
        setCardNumber(0);
      }
    },
    onSwipedLeft: () => {
      if (cardNumber >= onboardingPages.length - 1) {
        push("/profile");
      }
      if (cardNumber < onboardingPages.length - 1) {
        setCardNumber(cardNumber + 1);
      } else {
        setCardNumber(onboardingPages.length - 1);
      }
    },
  });
  return (
    <>
      <Topbar togglePanel={() => {}} context={""} />
      <div
        className="flex flex-auto flex-col justify-between p-4"
        {...swipeHandlers}
      >
        <Link href="/profile">
          <p
            className={`text-right p-4 text-base cursor-pointer ${styles.skipText}`}
          >
            {t("onboarding.skip")}
          </p>
        </Link>
        <Image
          src={onboardingPages[cardNumber].image}
          alt={"Onboarding"}
          layout="responsive"
          width="auto"
          height="auto"
          className="p-4"
        />
        <p className="text-center text-xl p-4">
          {t(`onboarding.${onboardingPages[cardNumber].name}`)}
        </p>
        <div className="flex flex-auto flex-row justify-center p-4">
          {onboardingPages.map((_, i) => (
            <div key={i} className="p-1">
              <Image
                src={`/icons/${darkMode ? "dark" : "light"}/onboarding-dot${
                  i === cardNumber ? "-full" : ""
                }.svg`}
                alt={"Onboarding"}
                width="15"
                height="15"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default withAuthenticationRequired(Onboarding);
