import { execute as graphQLExecute, subscribe, DocumentNode } from "graphql";
import { ApolloLink, Observable } from "@apollo/client";
import { resolvers, MessageStorage } from "./resolvers";
import typeDefs from "./typeDefs.graphql";
import { getOperationDefinitionNode } from "./utils";
import schema from "./schema"

export const executableSchemaLink = new ApolloLink((operation) => {
  return new Observable((observer) => {
    (async () => {
      try {
        const operationDefinitionNode = getOperationDefinitionNode(operation);
        if (operationDefinitionNode) {
          let resolveFn: any;
          if (operationDefinitionNode.operation === "subscription") {
            resolveFn = subscribe;
          } else {
            resolveFn = graphQLExecute;
          }

          const result: any = await resolveFn({
            operationName: operation?.operationName,
            variableValues: operation?.variables,
            resolvers: { ...resolvers },
            document: operation.query as DocumentNode,
            typeDefs,
            schema,
            contextValue: {
              messageStorage: new MessageStorage(window.localStorage),
            },
          });

          if (typeof result?.[Symbol.asyncIterator] === "function") {
            for await (const item of result) {
              observer.next(item);
            }
          } else {
            observer.next(result);
          }
        }
        observer.complete();
      } catch (e) {
        observer.error(e);
      }
    })();
  });
});
