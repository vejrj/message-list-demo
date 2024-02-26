import React, { Profiler } from "react";

import { useQuery, gql } from "@apollo/client";
import MessageOld from "./MessageOld";
import { AllMessageFragment } from "./Message";
import AllMessageListOld from "./AllMessageListOld.graphql";
import { markIdAsRendered, onRender } from "./utils";

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

const id = "MessageListOld";
const MessageListOld = () => {
  const { data } = useQuery(AllMessageListOld, { fetchPolicy: "cache-only" });

  markIdAsRendered(id);
  return (
    <Profiler id={id} onRender={onRender}>
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
    </Profiler>
  );
};

export default MessageListOld;
