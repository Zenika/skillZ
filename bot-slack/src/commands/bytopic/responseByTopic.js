const { verifyAgencyIsGiven } = require("../../lib/utils/verifyAgencyIsGiven");
const { verifyTopicIsGiven } = require("../../lib/utils/verifyTopicIsGiven");
const {
  getUsersByAgencyAndTopics,
} = require("../../lib/requestsHasura/getUsersByAgencyAndTopics");

async function responseByTopic(text) {
  let names = "";
  let agency = await verifyAgencyIsGiven(text);
  if (agency === "") return "fail";
  let topic = await verifyTopicIsGiven(text);
  if (topic === "") return "fail";

  const response = await getUsersByAgencyAndTopics(agency, topic);
  for (let i = 0; i < response.User.length; i++) {
    names =
      names +
      `:bulb: *${response.User[i].name}* liked ${topic} ! watch his or her profile there thanks to the link below \n :mag: https://skillz.zenika.com/profile/${response.User[i].email}\n\n\n`;
  }
  return names;
}

module.exports.responseByTopic = responseByTopic;
