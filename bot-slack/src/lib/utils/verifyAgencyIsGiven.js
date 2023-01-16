const { getAllAgencies } = require("../requestsHasura/getAllAgencies");

async function verifyAgencyIsGiven(text) {
  try {
    const response = await getAllAgencies();
    const tmp = text.split(" ");
    if (text < 2) return "";
    for (let i = 0; i < response.Agency.length; i++) {
      if (tmp[0].toUpperCase() === response.Agency[i].name.toUpperCase()) {
        return response.Agency[i].name;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return "";
}

module.exports.verifyAgencyIsGiven = verifyAgencyIsGiven;
