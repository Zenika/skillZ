const { responseByTopic } = require("./responseByTopic");
const { postTwoLinesMessage } = require("../../messages/postMessages");
const { switchCommands } = require("../../lib/utils/switchCommands");
const { getChannelID } = require("../../lib/bolt/getSlackInformations");
const { getAllTopics } = require("../../lib/requestsHasura/getAllTopics");
const { getAllAgencies } = require("../../lib/requestsHasura/getAllAgencies");

module.exports = {
  commandByTopic(app) {
    app.command(
      switchCommands("/bytopic"),
      async ({ ack, payload, context, body }) => {
        await ack();
        try {
          const allTopicsResponse = await getAllTopics();
          const allAgenciesResponse = await getAllAgencies();
          const responseCommand = await responseByTopic(body.text);
          const channelID = await getChannelID(body["user_id"], app, app.token);
          let stringy = "";
          allTopicsResponse.Topic.forEach(
            (topic) => (stringy = stringy.concat(topic.name + ", "))
          );
          const allTopics = stringy.slice(0, -2);
          stringy = "";
          allAgenciesResponse.Agency.forEach(
            (agency) => (stringy = stringy.concat(agency.name + ", "))
          );
          const allAgencies = stringy.slice(0, -2);

          if (responseCommand === "fail") {
            await postTwoLinesMessage(
              channelID,
              "*Command failed* :sweat:",
              `:bulb: *Use this command like this* : /skillz-by-topic [city] [topic] \n\n :globe_with_meridians: _City_ available : ${allAgencies} \n :clipboard: _Topic_ available : ${allTopics}`,
              app,
              context.botToken,
              "Response from /skillz-by-topic command"
            );
          } else if (responseCommand !== "") {
            await postTwoLinesMessage(
              channelID,
              ":heart: *All these Skillz users at this agency liked this topic* :heart:",
              responseCommand,
              app,
              context.botToken,
              "Response from /skillz-by-topic command"
            );
          } else {
            await postTwoLinesMessage(
              channelID,
              "*Sorry* :sweat:",
              "Nobody like this topic at this agency",
              app,
              context.botToken,
              "Response from /skillz-by-topic command"
            );
          }
        } catch (error) {
          console.error("error", error);
        }
      }
    );
  },
};
