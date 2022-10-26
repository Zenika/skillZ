async function getChannelID(userID, app, slackbotToken) {
  try {
    const result = await app.client.conversations.open({
      token: slackbotToken,
      users: userID,
    });
    if (result.ok === true) {
      return result.channel.id;
    }
  } catch (e) {
    console.error("error", e);
  }
  return "";
}

async function getUserID(email, app, slackBotToken) {
  try {
    const result = await app.client.users.lookupByEmail({
      token: slackBotToken,
      email: email,
    });
    if (result.ok === true) return result.user.id;
  } catch (e) {
    console.error("error", e);
  }
  return "";
}

async function getUserEmail(userID, app, slackBotToken) {
  try {
    const result = await app.client.users.profile.get({
      token: slackBotToken,
      user: userID,
    });
    if (result.ok === true) return result.profile.email;
  } catch (e) {
    console.error("error", e);
  }
}

module.exports.getChannelID = getChannelID;
module.exports.getUserID = getUserID;
module.exports.getUserEmail = getUserEmail;
