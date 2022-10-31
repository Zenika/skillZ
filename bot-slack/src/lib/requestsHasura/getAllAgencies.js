const { request } = require("../utils/requestGraphQL");
const { GET_ALL_AGENCIES } = require("../queries/getAllAgencies");

async function getAllAgencies() {
  try {
    const response = await request(GET_ALL_AGENCIES);
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

module.exports.getAllAgencies = getAllAgencies;
