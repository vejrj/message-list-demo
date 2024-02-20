import React from "react";
import Reaction from "./ReactionOld";

const MessageOld = ({ message }: { message: any }) => {
  if (!message) {
    return null;
  }

  return (
    <>
      <span>{message.name}</span>
      <input type="checkbox" checked={message.isCompleted} />
      {message.reactions.map((reaction: any) => (
        <Reaction key={reaction.id} reaction={reaction} />
      ))}
    </>
  );
};

export default MessageOld;
