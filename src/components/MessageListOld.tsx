import React from "react";

import { useQuery, gql } from "@apollo/client";
import MessageOld from "./MessageOld";
import { AllMessageFragment } from "./Message";
import AllMessageListOld from "./AllMessageListOld.graphql";

export const MessageListQuery = gql`
  query MessageListQuery {
    allMessages {
      __typename
      id
      ...AllMessageFragment
    }
  }

  ${AllMessageFragment}
`;

const MessageListOld = () => {
  const { data } = useQuery(AllMessageListOld, { fetchPolicy: "cache-only" });

  return (
    <>
      <h1>Message List Old</h1>
      <ul>
        {(data as any)?.allMessages?.map((message: any) => (
          <li key={message.id}>
            <MessageOld message={message} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default MessageListOld;
