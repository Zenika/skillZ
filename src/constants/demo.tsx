export function getTutorialStep(t: (path: string) => string, stepName: string) {
  /*
   * TUTORIAL CONFIG STEPS
   */

  if (stepName === "listSelector")
    return [
      {
        target: ".step1-infos",
        content: t("onboarding.demo.mine.mySkills.step1"),
        title: t("onboarding.demo.mine.mySkills.titlestep1"),
        back: "jds",
      },
      {
        target: ".step2-add-skill",
        content: t("onboarding.demo.mine.mySkills.step2"),
        title: t("onboarding.demo.mine.mySkills.titlestep2"),
        back: "jds",
      },
    ];
  if (stepName === "configMySkills")
    return [
      {
        target: ".step1-my-skills-tab",
        content: t("onboarding.demo.mine.step1"),
        title: t("onboarding.demo.mine.titlestep1"),
      },
      {
        target: ".step2-add-tab",
        content: t("onboarding.demo.mine.step2"),
        title: t("onboarding.demo.mine.titlestep2"),
      },
    ];
  if (stepName === "homeNoSkill")
    return [
      {
        target: ".step3-graph",
        content: t("onboarding.demo.home.step3"),
        title: t("onboarding.demo.home.titlestep3"),
      },
    ];
  if (stepName === "homeGraph")
    return [
      {
        target: ".step1-total-number",
        content: t("onboarding.demo.home.step1"),
        title: t("onboarding.demo.home.titlestep1"),
      },
      {
        target: ".step2-5bestskills",
        content: t("onboarding.demo.home.step2"),
      },
      {
        target: ".step3-graph",
        content: t("onboarding.demo.home.step3"),
        title: t("onboarding.demo.home.titlestep3"),
      },
    ];
}
