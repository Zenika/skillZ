const {
  getBotNotifications,
} = require("../../lib/requestsHasura/getBotNotifications");
const {
  setBotNotifications,
} = require("../../lib/requestsHasura/setBotNotifications");
const {
  getUserEmail,
  getChannelID,
} = require("../../lib/bolt/getSlackInformations");
const { postTwoLinesMessage } = require("../../messages/postMessages");
const { switchCommands } = require("../../lib/utils/switchCommands");

module.exports = {
  commandDesactivate(app) {
    app.command(
      switchCommands("/desactivate"),
      async ({ ack, payload, context, body }) => {
        await ack();
        const user = body["user_id"];
        try {
          const userEmail = await getUserEmail(user, app, app.token);
          const responseCommand = await getBotNotifications(userEmail);
          const channelID = await getChannelID(body["user_id"], app, app.token);
          if (
            responseCommand.User &&
            responseCommand.User[0].botNotifications === false
          ) {
            await postTwoLinesMessage(
              channelID,
              "*Command failed* :sweat:",
              ":bulb: *The Skillz reminder is already desactivate. To activate it try* : /skillz-activate",
              app,
              context.botToken,
              "Response from /skillz-desactivate command"
            );
          } else {
            await setBotNotifications(userEmail, false);
            await postTwoLinesMessage(
              channelID,
              ":hugging_face: *You've desactivated my monthly reminders* :hugging_face:",
              ":bulb: Get a reminder about your old noteskills if you have not updated them for more than one month. _You can display them right now by running_ /skillz-reminder-message :bulb:",
              app,
              context.botToken,
              "Response from /skillz-desactivate command"
            );
          }
        } catch (error) {
          console.error("error", error);
        }
      }
    );
  },
};
