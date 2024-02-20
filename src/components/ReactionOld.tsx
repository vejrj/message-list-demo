import React from "react";

import { useFragment, gql } from "@apollo/client";

const Reaction = ({ reaction }: { reaction: any }) => {
  return (
    <>
      <span key={reaction.id}>{reaction.id}</span>
    </>
  );
};

export default Reaction;
