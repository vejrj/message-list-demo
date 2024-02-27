import React, { Profiler } from "react";
import { gql, useMutation } from "@apollo/client";
import { MessageFragment } from "./Message";
import { markIdAsRendered, onRender, reset, TEST } from "./utils";
import ReactionOld from "./ReactionOld";

const UpdateMessage = gql`
  mutation UpdateMessage($id: ID!, $name: String, $isCompleted: Boolean) {
    updateMessage(id: $id, name: $name, isCompleted: $isCompleted) {
      ...MessageFragment
    }
  }

  ${MessageFragment}
`;

const MessageOld = ({ message }: { message: any }) => {
  const [updateMessage] = useMutation(UpdateMessage);

  if (!message) {
    return null;
  }

  const handleChange = ({ target }: any) => {
    reset();
    updateMessage({
      variables: {
        id: message.id,
        name: message.name,
        isCompleted: target.checked,
      },
    });
    console.log(TEST);
  };

  const id = `MessageOld-${message.id}`;
  markIdAsRendered(id);
  for (let i = 0; i < 1000000; i++) {}
  return (
    <Profiler id={id} onRender={onRender}>
      <>
        <span>{message.name}</span>
        <input
          type="checkbox"
          checked={message.isCompleted}
          onChange={handleChange}
        />
        {message.reactions.map((reaction: any) => (
          <ReactionOld key={reaction.id} reaction={reaction} />
        ))}
      </>
    </Profiler>
  );
};

export default MessageOld;
