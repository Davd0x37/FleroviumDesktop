import { TaskEmitter, Types, STATEMENT } from "../types";
import { get } from "lodash";

const parseStatement = (token: STATEMENT, $task: TaskEmitter): any => {
  switch (token.type) {
    case Types.FUNCTION: {
      const args = token.args.flatMap((arg) => parseStatement(arg, $task));

      return args.length > 0
        ? $task.helpers[token.name](...args)
        : $task.helpers[token.name]();
    }
    case Types.VARIABLE: {
      return get($task.vars, token.value);
    }
    case Types.GLOBAL_VARIABLE: {
      if (token.name === "$$value") {
        return $task.vars?.$$value;
      } else if (token.name === "$$parent") {
        return $task.vars?.$$parent;
      } else if (token.name === "$$serviceName") {
        return $task.$$serviceName;
      } else if (token.name.match("^\\$\\$(?<name>[\\w\\.]+)")) {
        return get($task.vars, token.name);
      } else {
        return get($task.vars, token.value);
      }
    }
    case Types.RAW_VALUE: {
      return token.value;
    }
    default:
      break;
  }
};

export const emitter = (ast: any, $task: TaskEmitter) => {
  for (const token of ast) {
    return parseStatement(token, $task);
  }
};
