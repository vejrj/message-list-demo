import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
} from "@apollo/client";
import React, { Profiler } from "react";
import { onError } from "@apollo/client/link/error";
import { executableSchemaLink } from "./schema/link";
import { ALL_MESSAGES_KEY } from "./schema/resolvers";
import data from "../myjsonfile.json";

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach((error) => {
      const { message, locations, path } = error;
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      console.error(error);
    });
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    console.error(networkError);
  }
});

import MessageList, { MessageListQuery } from "./components/MessageList";

if (!window.localStorage.getItem(ALL_MESSAGES_KEY)) {
  window.localStorage.setItem(ALL_MESSAGES_KEY, JSON.stringify(data));
}

const allMessages = JSON.parse(
  window.localStorage.getItem(ALL_MESSAGES_KEY) as string
);

const cache = new InMemoryCache();
try {
  cache.writeQuery({
    query: MessageListQuery,
    data: {
      allMessages: allMessages,
    },
  });
} catch (err) {
  console.log(err);
}

const client = new ApolloClient({
  cache,
  link: from([errorLink, executableSchemaLink]),
});

function App() {
  return (
    <Profiler
      id="Navigation"
      onRender={(_id, phase, actualDuration) => {
        if (phase === "mount") {
          console.log(`UseFragment - ${actualDuration}`);
        }
      }}
    >
      <ApolloProvider client={client}>
        <MessageList />
      </ApolloProvider>
    </Profiler>
  );
}

export default App;
