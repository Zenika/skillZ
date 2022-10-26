const { viewNoteSkill } = require("./noteSkill/viewNoteSkill");

module.exports = {
  viewHandler(app) {
    viewNoteSkill(app);
  },
};
