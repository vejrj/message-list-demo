import { v4 } from "uuid";
// import { Resolvers } from "@graphitation/supermassive";

interface Message {
  id: string;
  name: string;
  isCompleted: boolean;
  field0?: string;
  field1?: string;
  field2?: string;
  field3?: string;
  field4?: string;
  field5?: string;
  field6?: string;
  field7?: string;
  field8?: string;
  field9?: string;
  field10?: string;
  field11?: string;
  field12?: string;
  field13?: string;
  field14?: string;
  field15?: string;
  field16?: string;
  field17?: string;
  field18?: string;
  field19?: string;
  field20?: string;
  field21?: string;
  field22?: string;
  field23?: string;
  field24?: string;
  field25?: string;
  field26?: string;
  field27?: string;
  field28?: string;
  field29?: string;
  field30?: string;
  field31?: string;
  field32?: string;
  field33?: string;
  field34?: string;
  field35?: string;
  field36?: string;
  field37?: string;
  field38?: string;
  field39?: string;
  field40?: string;
  field41?: string;
  field42?: string;
  field43?: string;
  field44?: string;
  field45?: string;
  field46?: string;
  field47?: string;
  field48?: string;
  field49?: string;
  field50?: string;
  field51?: string;
  field52?: string;
  field53?: string;
  field54?: string;
  field55?: string;
  field56?: string;
  field57?: string;
  field58?: string;
  field59?: string;
  field60?: string;
  field61?: string;
  field62?: string;
  field63?: string;
  field64?: string;
  field65?: string;
  field66?: string;
  field67?: string;
  field68?: string;
  field69?: string;
  field70?: string;
  field71?: string;
  field72?: string;
  field73?: string;
  field74?: string;
  field75?: string;
  field76?: string;
  field77?: string;
  field78?: string;
  field79?: string;
  field80?: string;
  field81?: string;
  field82?: string;
  field83?: string;
  field84?: string;
  field85?: string;
  field86?: string;
  field87?: string;
  field88?: string;
  field89?: string;
  field90?: string;
  field91?: string;
  field92?: string;
  field93?: string;
  field94?: string;
  field95?: string;
  field96?: string;
  field97?: string;
  field98?: string;
  field99?: string;
}

export const ALL_MESSAGES_KEY = "ALL_MESSAGES";

export class MessageStorage {
  localStorage: Storage;

  constructor(localStorage: Storage) {
    this.localStorage = localStorage;
  }

  getAllMessages(): Array<Message> {
    const existingMessages = this.localStorage.getItem(ALL_MESSAGES_KEY);
    console.log(JSON.parse(existingMessages as string))
    if (existingMessages) {
      return JSON.parse(existingMessages) as any as Array<Message>;
    } else {
      return [];
    }
  }

  saveMessages(messages: Array<Message>): void {
    this.localStorage.setItem(ALL_MESSAGES_KEY, JSON.stringify(messages));
  }

  createMessage(name: string): Message {
    const messages = this.getAllMessages();
    const message: Message = {
      id: v4(),
      name,
      isCompleted: false,
    };
    messages.push(message);
    this.saveMessages(messages);
    return message;
  }

  updateMessage({
    id,
    name,
    isCompleted,
  }: {
    id: string;
    name?: string;
    isCompleted?: boolean;
  }): Message | null {

    const messages = this.getAllMessages();
    const message = messages.find(({ id: messageId }) => messageId === id) as Message;
      const messageIndex = parseInt(message.id, 10)
      if (name) {
        messages[messageIndex].name = name;
      }
      if (isCompleted != null) {
        messages[messageIndex].isCompleted = isCompleted;
      }
      this.saveMessages(messages);

      console.log(messages[messageIndex])
    return messages[messageIndex];
  }
}

export type Context = {
  messageStorage: MessageStorage;
};

export const resolvers: any = {
  Query: {
    allMessages(
      _source: any,
      _args: any,
      context: { messageStorage: { getAllMessages: () => any } },
      _info: any
    ) {
      return context.messageStorage.getAllMessages();
    },
  },
  Mutation: {
    updateMessage(
      _source: any,
      message: Message,
      context: { messageStorage: { updateMessage: (message: Message ) => Message } },
    ) {
      return context.messageStorage.updateMessage(message)
    }
  }
};
