const {
  getUserEmail,
  getChannelID,
} = require("../../lib/bolt/getSlackInformations");
const { postSingleLineMessage } = require("../../messages/postMessages");
const {
  getAllSkillsNames,
} = require("../../lib/requestsHasura/getAllSkillsNames");
const {
  getSkillCategoryAndIDByName,
} = require("../../lib/requestsHasura/getSkillCategoryAndIDByName");
const {
  setSkillsDesireSkillLevel,
} = require("../../lib/requestsHasura/setSkillsDesireSkillLevel");

let skillName = "";

module.exports = {
  async changeCommandValueForView(command) {
    const allSkills = await getAllSkillsNames();

    for (let i = 0; i < allSkills.Skill.length; i++) {
      if (command.toUpperCase() === allSkills.Skill[i].name.toUpperCase()) {
        skillName = allSkills.Skill[i].name;
        return skillName;
      }
    }
    return "fail";
  },
  viewNoteSkill(app) {
    app.view("noteSkill", async ({ ack, body, view }) => {
      await ack();
      const skillValue =
        view["state"]["values"]["skill"]["informationModal"]["selected_option"][
          "value"
        ];
      const desireValue =
        view["state"]["values"]["desire"]["informationModal"][
          "selected_option"
        ]["value"];
      const user = body["user"]["id"];
      try {
        const userEmail = await getUserEmail(user, app, app.token);
        const skillCategoryAndID = await getSkillCategoryAndIDByName(skillName);
        setSkillsDesireSkillLevel(
          userEmail,
          skillCategoryAndID.id,
          skillValue,
          desireValue
        );
        const channelID = await getChannelID(user, app, app.token);
        await postSingleLineMessage(
          channelID,
          `:tada: You've updated your desire and skill level of *${skillName}* :tada:\n\n:bar_chart: Watch the graph of this skill here https://skillz.zenika.com/skills/mine/${skillCategoryAndID.Category.label}`,
          app,
          app.token,
          "Response from /note"
        );
      } catch (e) {
        console.error("error", e);
      }
    });
  },
};
