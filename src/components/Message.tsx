import React, { Profiler } from "react";

import { useFragment, gql, useMutation } from "@apollo/client";
import Reaction, { ReactionFragment } from "./Reaction";
import ReactionOld from "./ReactionOld";
import { TEST, markIdAsRendered, onRender, reset } from "./utils";

export const AllMessageFragment = gql`
  fragment AllMessageFragment on Message {
    __typename
    id
    name
    reactions {
      id
      field0
      field1
      field2
      field3
    }
    isCompleted
    field0
    field1
    field2
    field3
    field4
    field5
    field6
    field7
    field8
    field9
    field10
    field11
    field12
    field13
    field14
    field15
    field16
    field17
    field18
    field19
    field20
    field21
    field22
    field23
    field24
    field25
    field26
    field27
    field28
    field29
    field30
    field31
    field32
    field33
    field34
    field35
    field36
    field37
    field38
    field39
    field40
    field41
    field42
    field43
    field44
    field45
    field46
    field47
    field48
    field49
    field50
    field51
    field52
    field53
    field54
    field55
    field56
    field57
    field58
    field59
    field60
    field61
    field62
    field63
    field64
    field65
    field66
    field67
    field68
    field69
    field70
    field71
    field72
    field73
    field74
    field75
    field76
    field77
    field78
    field79
    field80
    field81
    field82
    field83
    field84
    field85
    field86
    field87
    field88
    field89
    field90
    field91
    field92
    field93
    field94
    field95
    field96
    field97
    field98
    field99
  }
`;

export const MessageFragment = gql`
  fragment MessageFragment on Message {
    __typename
    id
    name
    reactions {
      __typename
      id
      ...ReactionFragment
    }
    isCompleted
    field0
    field1
    field2
    field3
    field4
    field5
    field6
    field7
    field8
    field9
    field10
    field11
    field12
    field13
    field14
    field15
    field16
    field17
    field18
    field19
    field20
    field21
    field22
    field23
    field24
    field25
    field26
    field27
    field28
    field29
    field30
    field31
    field32
    field33
    field34
    field35
    field36
    field37
    field38
    field39
    field40
    field41
    field42
    field43
    field44
    field45
    field46
    field47
    field48
    field49
    field50
    field51
    field52
    field53
    field54
    field55
    field56
    field57
    field58
    field59
    field60
    field61
    field62
    field63
    field64
    field65
    field66
    field67
    field68
    field69
    field70
    field71
    field72
    field73
    field74
    field75
    field76
    field77
    field78
    field79
    field80
    field81
    field82
    field83
    field84
    field85
    field86
    field87
    field88
    field89
    field90
    field91
    field92
    field93
    field94
    field95
    field96
    field97
    field98
    field99
  }

  ${ReactionFragment}
`;

const UpdateMessage = gql`
  mutation UpdateMessage($id: ID!, $name: String, $isCompleted: Boolean) {
    updateMessage(id: $id, name: $name, isCompleted: $isCompleted) {
      ...MessageFragment
    }
  }

  ${MessageFragment}
`;

const Message = ({ messageId }: { messageId: string }) => {
  const data: any = useFragment({
    fragment: MessageFragment,
    fragmentName: "MessageFragment",
    from: {
      __typename: "Message",
      id: messageId,
    },
  });

  const [updateMessage] = useMutation(UpdateMessage);

  if (!data?.data) {
    return null;
  }

  const { data: message } = data;

  const handleChange = ({ target }: any) => {
    reset();
    updateMessage({
      variables: {
        id: messageId,
        name: message.name,
        isCompleted: target.checked,
      },
    });
    console.log(TEST);
  };

  const id = `Message-${message.id}`;

  markIdAsRendered(id);

  for (let i = 0; i < 1000000; i++) {}
  return (
    <>
      <span>{message.name}</span>
      <input
        type="checkbox"
        checked={message.isCompleted}
        onChange={handleChange}
      />
      {message.reactions.map((reaction: any) => (
        //<Reaction key={reaction.id} reactionId={reaction.id} />
        <Reaction key={reaction.id} reactionId={reaction.id} />
      ))}
    </>
  );
};

export default Message;
