const { getUserID } = require("../lib/bolt/getSlackInformations");
const {
  getSkillNameAndCategory,
} = require("../lib/requestsHasura/getSkillNameAndCategory");
const {
  postMessageSkillReminder,
} = require("../messages/messageSkillReminder");

async function fillSkillsByCategory(userEmail, arraySkill, app, reminder) {
  let arraySkillName = [];
  let arrayTools = [];
  let arrayLanguagesAndFrameworks = [];
  let arrayPlatforms = [];
  let arrayTechnicsAndMethods = [];
  const userID = await getUserID(userEmail, app, app.token);
  if (userID.length > 0) {
    for (let i = 0; i < arraySkill.length; i++) {
      arraySkillName = arraySkillName.concat(
        await getSkillNameAndCategory(arraySkill[i])
      );
      if (arraySkillName[i].Category.label === "practices") {
        arrayLanguagesAndFrameworks = arrayLanguagesAndFrameworks.concat(
          arraySkillName[i].name
        );
      }
      if (arraySkillName[i].Category.label === "activities") {
        arrayTools = arrayTools.concat(arraySkillName[i].name);
      }
      if (arraySkillName[i].Category.label === "knowledge") {
        arrayPlatforms = arrayPlatforms.concat(arraySkillName[i].name);
      }
      if (arraySkillName[i].Category.label === "behaviors") {
        arrayTechnicsAndMethods = arrayTechnicsAndMethods.concat(
          arraySkillName[i].name
        );
      }
    }
    await postMessageSkillReminder(
      userID,
      app,
      arrayLanguagesAndFrameworks.toString(),
      arrayTools.toString(),
      arrayPlatforms.toString(),
      arrayTechnicsAndMethods.toString(),
      reminder
    );
  }
}
module.exports.fillSkillsByCategory = fillSkillsByCategory;
