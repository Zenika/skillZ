import React, { useContext, useState } from "react";
import { i18nContext } from "../../../utils/i18nContext";
import Image from "next/image";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { GET_USER_SKILLS_ID } from "../../../graphql/queries/skills";
import { GetUserSkillsIdQuery } from "../../../generated/graphql";
import { useQuery } from "@apollo/client";

const TopBar = () => {
  const { t } = useContext(i18nContext);
  const { user } = useAuth0();
  const { data: userSkillsId } = useQuery<GetUserSkillsIdQuery>(
    GET_USER_SKILLS_ID,
    {
      variables: { email: user.email },
    }
  );
  const [openDemo, setOpenDemo] = useState(true);

  // MG_TUTORIAL_MODE
  useEffect(() => {
    if (
      userSkillsId?.UserSkillDesire.length === 0 ||
      localStorage.getItem("demo") === "true"
    ) {
      localStorage.setItem("demo", "true");
      setOpenDemo(true);
    } else {
      localStorage.setItem("demo", "false");
      setOpenDemo(false);
    }
  }, [openDemo, userSkillsId]);

  return (
    <>
      {openDemo && (
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
              <p className="opacity-70">{t("onboarding.home.remind")}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;
