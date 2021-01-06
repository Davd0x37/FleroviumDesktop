import { TaskRunner } from "@/runner";
import actions from "./actions";
import helpers from "./helpers";

interface TaskArgs {
  stash: any;
  taskName: TaskNames;
  globalScript: Record<string, any>;
}

export const runTask = async ({ stash, taskName, globalScript }: TaskArgs) => {
  const schema = stash.globalScript ? globalScript : stash.script;
  const vars = {
    ...stash.vars,
    ...globalScript.vars,
  };
  const name = stash.name;
  const runner = new TaskRunner(schema, { helpers, actions, vars, name });
  runner.initVars();
  await runner.run(taskName);
};

export enum TaskNames {
  AUTHENTICATE_SERVICE = "authenticateService",
  REQUEST_TOKENS = "requestTokens",
  REQUEST_DATA = "requestData",
}
