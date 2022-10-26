const { getUserID } = require("./getSlackInformations");
const { getAllEmails } = require("../requestsHasura/getAllEmails");

async function getAllUsersID(app, slackBotToken) {
  let usersIDArray = [];

  const response = await getAllEmails();
  let userID;

  for (let i = 0; i < response.User.length; i++) {
    if (
      (userID = await getUserID(response.User[i].email, app, slackBotToken)) ===
      ""
    )
      continue;
    usersIDArray = usersIDArray.concat(userID);
  }
  return usersIDArray;
}

module.exports.getAllUsersID = getAllUsersID;
