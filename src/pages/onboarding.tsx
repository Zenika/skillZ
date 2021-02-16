import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { i18nContext } from "../utils/i18nContext";
import Topbar from "../components/Topbar";
import Link from "next/link";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/router";
import styles from "./onboarding.module.css";

const onboardingPages = [
  {
    image: "/img/onboarding-addSkills.svg",
    name: "addSkillsDescription",
  },
  {
    image: "/img/onboarding-discoverZenikaSkills.svg",
    name: "discoverZenikaSkillsDescription",
  },
];

const Onboarding = ({ onboardingPages }) => {
  const { t } = useContext(i18nContext);
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
        push("/profile/create");
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
      <Topbar />
      <div
        className="flex flex-auto flex-col justify-between p-4"
        {...swipeHandlers}
      >
        <Link href="/profile/create">
          <p className={`text-right p-4 text-base ${styles.skipText}`}>
            {t("onboarding.skip")}
          </p>
        </Link>
        <Image
          src={onboardingPages[cardNumber].image}
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
                src={`/icons/onboarding-dot${
                  i === cardNumber ? "-full" : ""
                }.svg`}
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

export async function getStaticProps(context) {
  return {
    props: {
      onboardingPages,
    },
  };
}

export default withAuthenticationRequired(Onboarding);
