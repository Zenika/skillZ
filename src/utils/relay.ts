import { useMemo } from "react";
import {
  Environment,
  FetchFunction,
  Network,
  RecordSource,
  Store,
} from "relay-runtime";

let relayEnvironment;

function createEnvironment(fetchQuery: FetchFunction) {
  return new Environment({
    // Create a network layer from the fetch function
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
  });
}

export function initEnvironment(fetchQuery: FetchFunction, initialRecords?) {
  // Create a network layer from the fetch function
  const environment = relayEnvironment ?? createEnvironment(fetchQuery);
  // If your page has Next.js data fetching methods that use Relay, the initial records
  // will get hydrated here
  if (initialRecords) {
    environment.getStore().publish(new RecordSource(initialRecords));
  }
  // For SSG and SSR always create a new Relay environment
  if (typeof window === "undefined") return environment;
  // Create the Relay environment once in the client
  if (!relayEnvironment) relayEnvironment = environment;

  return relayEnvironment;
}

export function useEnvironment(fetchQuery: FetchFunction, initialRecords?) {
  const store = useMemo(() => initEnvironment(fetchQuery, initialRecords), [
    initialRecords,
  ]);
  return store;
}
