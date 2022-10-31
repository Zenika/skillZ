const {
  getAllSkillsNames,
} = require("../../lib/requestsHasura/getAllSkillsNames");

async function responseNote(command) {
  const allSkills = await getAllSkillsNames();
  let skillName = "";

  for (let i = 0; i < allSkills.Skill.length; i++) {
    if (command.toUpperCase() === allSkills.Skill[i].name.toUpperCase()) {
      skillName = allSkills.Skill[i].name;
      break;
    }
  }
  return "fail";
}

module.exports.responseNote = responseNote;
