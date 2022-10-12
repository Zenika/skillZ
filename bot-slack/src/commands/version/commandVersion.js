var pjson = require("../../../package.json");
const { getChannelID } = require("../../lib/bolt/getSlackInformations");
const { switchCommands } = require("../../lib/utils/switchCommands");
const { postSingleLineMessage } = require("../../messages/postMessages");

module.exports = {
  commandVersion(app) {
    app.command(
      switchCommands("/version"),
      async ({ ack, payload, context, body }) => {
        await ack();
        try {
          const channelId = await getChannelID(body["user_id"], app, app.token);
          await postSingleLineMessage(
            channelId,
            `The actual version of this bot is ${pjson.version}`,
            app,
            context.botToken,
            "Response from /skillz-version"
          );
        } catch (e) {
          console.error(e);
        }
      }
    );
  },
};
