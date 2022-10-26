const GET_CATEGORY_BY_ID = `query getCategoryById($categoryId: uuid!) {
    Category_by_pk(id: $categoryId) {
      label
    }
  }
  `;

module.exports.GET_CATEGORY_BY_ID = GET_CATEGORY_BY_ID;
