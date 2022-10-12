const {
  getAllSkillsNames,
} = require("../../lib/requestsHasura/getAllSkillsNames");
const {
  getSkillsInfosDesireAndSkillByID,
} = require("../../lib/requestsHasura/getSkillsInfosDesireAndSkillByID");
const { getUserEmail } = require("../../lib/bolt/getSlackInformations");
const {
  getSkillIDByName,
} = require("../../lib/requestsHasura/getSkillIDByName");

let skillName = "";

module.exports = {
  async changeCommandValueForAction(command) {
    const allSkills = await getAllSkillsNames();

    for (let i = 0; i < allSkills.Skill.length; i++) {
      if (command.toUpperCase() === allSkills.Skill[i].name.toUpperCase()) {
        skillName = allSkills.Skill[i].name;
        return skillName;
      }
    }
    return "fail";
  },
  actionNoteSkill(app) {
    app.action("noteSkill", async ({ ack, body, context }) => {
      await ack();
      let skillLastDesireValue = 1;
      let skillLastSkillValue = 1;
      let newSkill = true;
      const userEmail = await getUserEmail(
        body["user"]["id"],
        app,
        context.botToken
      );
      const skillID = await getSkillIDByName(skillName);
      const response = await getSkillsInfosDesireAndSkillByID(
        userEmail,
        skillID.id
      );
      if (
        response.User.length > 0 &&
        response.User[0].UserSkillDesires.length > 0
      ) {
        newSkill = false;
        skillLastDesireValue = response.User[0].UserSkillDesires[0].desireLevel;
        skillLastSkillValue = response.User[0].UserSkillDesires[0].skillLevel;
      }
      try {
        await app.client.views.open({
          trigger_id: body.trigger_id,
          token: context.botToken,
          view: {
            type: "modal",
            // View identifier
            callback_id: "noteSkill",
            title: {
              type: "plain_text",
              text: "Update your Skillz datas",
            },
            blocks: [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*${skillName}*`,
                },
              },
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: newSkill
                    ? "_This is the first time that you note this skill_"
                    : `_Your last notes were *${skillLastSkillValue}/5* as knowledge level and *${skillLastDesireValue}/5* as desire level_`,
                },
              },
              {
                type: "divider",
              },
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: "Knowledge",
                },
                block_id: "skill",
                accessory: {
                  type: "radio_buttons",
                  action_id: "informationModal",
                  initial_option: {
                    value: "1",
                    text: {
                      type: "plain_text",
                      text: "1: I looked at what is was",
                    },
                  },
                  options: [
                    {
                      value: "1",
                      text: {
                        type: "plain_text",
                        text: "1: I looked at what is was",
                      },
                    },
                    {
                      value: "2",
                      text: {
                        type: "plain_text",
                        text: "2: I played with it, I tested it",
                      },
                    },
                    {
                      value: "3",
                      text: {
                        type: "plain_text",
                        text: "3: I have worked with it on significant projects",
                      },
                    },
                    {
                      value: "4",
                      text: {
                        type: "plain_text",
                        text: "4: I've worked with it, I'm pretty comfortable, I've done some research",
                      },
                    },
                    {
                      value: "5",
                      text: {
                        type: "plain_text",
                        text: "5: I've worked a lot with it in different contexts, I know it perfectly",
                      },
                    },
                  ],
                },
              },
              {
                type: "divider",
              },
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: "Desire",
                },
                block_id: "desire",
                accessory: {
                  type: "radio_buttons",
                  action_id: "informationModal",
                  initial_option: {
                    value: "1",
                    text: {
                      type: "plain_text",
                      text: "1: I don't want to use it anymore and/or I don't want to learn",
                    },
                  },
                  options: [
                    {
                      value: "1",
                      text: {
                        type: "plain_text",
                        text: "1: I don't want to use it anymore and/or I don't want to learn",
                      },
                    },
                    {
                      value: "2",
                      text: {
                        type: "plain_text",
                        text: "2: I prefer to avoid, or only to troubleshoot",
                      },
                    },
                    {
                      value: "3",
                      text: {
                        type: "plain_text",
                        text: "3: I don't love it but it doesn't bother me",
                      },
                    },
                    {
                      value: "4",
                      text: {
                        type: "plain_text",
                        text: "4: I really like it",
                      },
                    },
                    {
                      value: "5",
                      text: {
                        type: "plain_text",
                        text: "5: I want to use it everyday",
                      },
                    },
                  ],
                },
              },
            ],
            submit: {
              type: "plain_text",
              text: "Submit",
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    });
    app.action("informationModal", async ({ ack }) => {
      await ack();
    });
  },
};
