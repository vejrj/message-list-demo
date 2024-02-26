import React from "react";

const Reaction = ({ reaction }: { reaction: any }) => {
  return (
    <>
      <span key={reaction.id}>{reaction.id}</span>
    </>
  );
};

export default Reaction;
