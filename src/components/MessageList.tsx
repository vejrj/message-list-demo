import React from "react";

import { useQuery, gql } from "@apollo/client";
import Message, { MessageFragment, AllMessageFragment } from "./Message";

export const MessageListQuery = gql`
  query MessageListQuery {
    allMessages {
      __typename
      id
      ...MessageFragment @nonreactive
    }
  }

  ${MessageFragment}
`;

export const AllMessageListQuery = gql`
  query MessageListQuery {
    allMessages {
      __typename
      id
      ...AllMessageFragment @nonreactive
    }
  }

  ${AllMessageFragment}
`;

const MessageList = () => {
  const { data } = useQuery(MessageListQuery, { fetchPolicy: "cache-only" });

  return (
    <>
      <h1>Message List</h1>
      <ul>
        {(data as any)?.allMessages?.map((message: any) => (
          <li key={message.id}>
            <Message messageId={message.id} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default MessageList;
