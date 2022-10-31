const { GET_CATEGORY_BY_ID } = require("../queries/getCategoryById");
const { request } = require("../utils/requestGraphQL");

//should be used if we would transform the categories of bot as generic
async function getCategoryById(categoryId) {
  const variables = {
    categoryId: categoryId,
  };
  const response = await request(GET_CATEGORY_BY_ID, variables);
  console.log("response.data", response.data);
  return response.data.Category_by_pk;
}
module.exports.getCategoryById = getCategoryById;
