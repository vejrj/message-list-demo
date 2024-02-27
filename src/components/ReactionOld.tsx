import React from "react";

const Reaction = ({ reaction }: { reaction: any }) => {
  for (let i = 0; i < 1000000; i++) {}
  return (
    <>
      <span key={reaction.id}>{reaction.id}</span>
    </>
  );
};

export default Reaction;
