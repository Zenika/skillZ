import { ApolloError } from "@apollo/client/errors";
import { useNotification } from "../utils/useNotification";
import { graphqlErrorCodes } from "./graphql-errors";

export default function ApolloErrorHandler(
  error: ApolloError,
  t: (path: string) => string
) {
  if (!error) return;
  const { graphQLErrors } = error;

  if (
    !graphQLErrors &&
    graphQLErrors.length &&
    graphqlErrorCodes[graphQLErrors[0].extensions.code]
  ) {
    useNotification(
      `${t(graphqlErrorCodes[graphQLErrors[0].extensions.code])}`,
      "red",
      5000
    );
  } else {
    useNotification(`${t("error.unknown")}`, "red", 5000);
  }
}
