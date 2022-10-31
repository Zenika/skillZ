const { actionNoteSkill } = require("./noteSkill/actionNoteSkill");
module.exports = {
  actionsHandler(app) {
    actionNoteSkill(app);
  },
};
