const { getUserEmail } = require("../../lib/bolt/getSlackInformations");
const {
  arrayOfDelayedSkillsByUsers,
} = require("../../cron/arraysOfDelayedSkills");
const { switchCommands } = require("../../lib/utils/switchCommands");

module.exports = {
  commandOldSkills(app) {
    app.command(switchCommands("/oldSkills"), async ({ ack, body }) => {
      await ack();
      const user = body["user_id"];
      try {
        const userEmail = await getUserEmail(user, app, app.token);
        await arrayOfDelayedSkillsByUsers(app, userEmail);
      } catch (error) {
        console.error("error", error);
      }
    });
  },
};
