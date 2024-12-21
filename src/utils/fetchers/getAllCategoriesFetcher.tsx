import { of } from 'await-of';
import { fetcher } from '../fetcher';

export const GetAllCategoriesQuery = `
query getAllCategories {
  Category(order_by: {label: asc}) {
    id
    description
    color
    index
    label
    x
    y
  }
}`;

export const GetAllCategoriesFetcher = async () => {
    const [response, err] = await of(fetcher(GetAllCategoriesQuery, {}));

    if (err) {
        console.error(err);
        return null;
    }

    return await response.json();
};
