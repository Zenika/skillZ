import React, { useContext, useState } from "react";
import { i18nContext } from "../../../utils/i18nContext";
import Image from "next/image";
import { TutorialModeContext } from "../../../utils/tutorialMode";
import { useQuery } from "@apollo/client";
import { GetUserSkillsIdQuery } from "../../../generated/graphql";
import { useAuth0 } from "@auth0/auth0-react";
import { GET_USER_SKILLS_ID } from "../../../graphql/queries/skills";
import { useEffect } from "react";
import { useTutorialMode } from "../../../utils/tutorialMode";

const TutorialTopBar = () => {
  const { t } = useContext(i18nContext);
  const tutorialModeValue = useContext(TutorialModeContext);
  const { changeTutorialMode } = useTutorialMode();
  const { user } = useAuth0();
  const { data: userSkillsId } = useQuery<GetUserSkillsIdQuery>(
    GET_USER_SKILLS_ID,
    {
      variables: { email: user.email, fetchPolicy: "network-only" },
    }
  );

  useEffect(() => {
    if (userSkillsId?.UserSkillDesire?.length == 0) {
      changeTutorialMode(true);
    }
  }, [userSkillsId, TutorialModeContext]);

  return (
    <>
      {tutorialModeValue?.tutorialMode && (
        <div className="flex justify-between mb-4 p-2 w-full gradient-red-faded rounded">
          <div className="flex flex-row">
            <Image
              className="w-16 h-16 rounded-full"
              height="64"
              width="64"
              src={"/fusee.png"}
              alt={"logoTutorial"}
            />
            <div className="flex flex-col mx-4 justify-center">
              <p className="">{t("onboarding.home.welcome")}</p>
              <p className="opacity-70">
                {userSkillsId?.UserSkillDesire?.length === 0
                  ? t("onboarding.home.remindBeginner")
                  : t("onboarding.home.remind")}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TutorialTopBar;
