import React, { Profiler } from "react";

import { useQuery, gql } from "@apollo/client";
import Message, { MessageFragment, AllMessageFragment } from "./Message";
import { markIdAsRendered, onRender } from "./utils";

export const MessageListQuery = gql`
  query MessageListQuery {
    allMessages {
      __typename
      id
      ...MessageFragment @nonreactive @mask
    }
  }

  ${MessageFragment}
`;

export const AllMessageListQuery = gql`
  query MessageListQuery {
    allMessages {
      __typename
      id
      ...AllMessageFragment @nonreactive @mask
    }
  }

  ${AllMessageFragment}
`;

const id = "MessageList";
const MessageList = () => {
  const { data } = useQuery(MessageListQuery, { fetchPolicy: "cache-only" });

  markIdAsRendered(id);
  return (
    <Profiler id={id} onRender={onRender}>
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
    </Profiler>
  );
};

export default MessageList;
