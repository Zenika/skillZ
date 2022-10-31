const { getAllTopics } = require("../requestsHasura/getAllTopics");

async function verifyTopicIsGiven(text) {
  try {
    const response = await getAllTopics();
    let ignoreCity = false;
    let topic = "";
    if (text < 2) return "";

    for (let i = 0; i < text.length; i++) {
      if (ignoreCity === false && text[i] === " ") {
        ignoreCity = true;
        continue;
      }
      if (ignoreCity) {
        topic = topic.concat(text[i]);
      }
    }

    for (let i = 0; i < response.Topic.length; i++) {
      if (response.Topic[i].name.toUpperCase() === topic.toUpperCase())
        return response.Topic[i].name;
    }
  } catch (e) {
    console.error(e);
  }
  return "";
}

module.exports.verifyTopicIsGiven = verifyTopicIsGiven;
