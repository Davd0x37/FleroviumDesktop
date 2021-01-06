import { isTemplate, tokenize, parse } from "./template";
import { emitter } from "./template/emitter";
import {
  IVars,
  Helpers,
  Actions,
  Task,
  VARS,
  TaskRunnerConstructor,
} from "./types";
import { get } from "lodash";

export default class TaskRunner {
  private actions: Actions;
  private helpers: Helpers;
  private name!: string;
  private schema: Task;
  private vars: IVars;

  constructor(schema: Task, { helpers, actions, vars, name }: TaskRunnerConstructor) {
    this.actions = actions;
    this.helpers = helpers;
    this.name = name || schema.name;
    this.schema = schema;
    this.vars = { ...schema.vars, ...vars } || {};
  }

  public initVars() {
    this.vars = this.parseParams(this.vars) || this.vars;
    this.vars.$$serviceName = this.name;
    this.vars.$$value = null;
    this.vars.$$parent = null;
  }

  public async run(taskName: string) {
    console.log(this.schema, this.name);
    const task = get(this.schema.tasks, taskName);

    for await (const step of task.steps) {
      console.group(step.action);
      console.log(`[${this.name}] Now running: ${step.action}!`);
      step.description &&
        console.log(`[${this.name}] Description: ${step.description}`);
      console.groupEnd();

      const params = step.params && this.parseParams(step.params);
      const action = await this.actions[step.action](this.vars, params);
      this.vars.$$value = action;

      const returnValue = step.return ? this.parseParams(step.return) : "";
      this.vars.$$parent = returnValue;
      this.vars.$$value = "";
    }
  }

  private emitTemplate(template: string) {
    // Template starts as string {{ @template }} or {{ 'raw_value' }}
    if (typeof template === "string" && isTemplate(template)) {
      const tokens = tokenize(template);
      if (tokens) {
        const parsed = parse(tokens);

        return emitter(parsed, {
          helpers: this.helpers,
          vars: this.vars,
          $$serviceName: this.name,
        });
      }
    }

    return template;
  }

  private parseParams(params: VARS): Record<string, any> | null {
    if (typeof params === "string") {
      return this.emitTemplate(params);
    } else if (Array.isArray(params)) {
      return params.map((param: VARS) => this.parseParams(param));
    } else if (params !== null && typeof params === "object") {
      return Object.entries(params).reduce((prev, [key, val]) => {
        const parsed = this.parseParams(val);

        return {
          ...prev,
          [key]: parsed,
        };
      }, {});
    }

    return null;
  }
}
