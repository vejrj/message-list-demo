import React from "react";

import { useFragment, gql } from "@apollo/client";

export const ReactionFragment = gql`
  fragment ReactionFragment on Reaction {
    id
    field0
    field1
    field2
    field3
  }
`;

const Reaction = ({ reactionId }: { reactionId: string }) => {
  const data: any = useFragment({
    fragment: ReactionFragment,
    fragmentName: "ReactionFragment",
    from: {
      __typename: "Reaction",
      id: reactionId,
    },
  });

  if (!data?.data) {
    return null;
  }

  const { data: reaction } = data;
  for (let i = 0; i < 1000000; i++) {}
  return (
    <>
      <span key={reaction.id}>{reaction.id}</span>
    </>
  );
};

export default Reaction;
