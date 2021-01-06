import { RuleMatch, Types, STATEMENT } from "../types";

export const parse = (tokens: RuleMatch[]) => {
  const it = tokens[Symbol.iterator]();
  let currentToken = it.next().value;

  const eatToken = (token?: string) => {
    if (token && token !== currentToken.value) {
      throw Error(`Token not exists ${token}`);
    }
    currentToken = it.next().value;
  };

  const parseStatement = (): STATEMENT | undefined => {
    switch (currentToken.type) {
      case Types.FUNCTION: {
        const functionName = currentToken.extended.groups.name;
        eatToken();

        const args = [];
        while (currentToken.type !== Types.TEMPLATE_END) {
          args.push(parseStatement());
        }

        return {
          type: Types.FUNCTION,
          name: functionName,
          args
        };
      }

      case Types.VARIABLE:
      case Types.GLOBAL_VARIABLE: {
        const varrType = currentToken;
        eatToken();
        return {
          type: varrType.type,
          name: varrType.value,
          value: varrType.extended.groups.name
        };
      }

      case Types.RAW_VALUE: {
        const varrType = currentToken;
        eatToken();
        return {
          type: varrType.type,
          value: varrType.extended.groups.value
        };
      }

      default: {
        eatToken();
        break;
      }
    }
  };

  const nodes = [];
  while (currentToken) {
    nodes.push(parseStatement());
  }

  return nodes.filter(n => n);
};
