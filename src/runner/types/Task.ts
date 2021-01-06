export interface Task {
  name: string;
  vars: Record<string, any>;
  tasks: Record<string, TaskElement>;
}

export interface TaskElement {
  description: string;
  steps: Step[];
}

export interface Step {
  action: string;
  description?: string;
  params?: Record<string, any> | string | any[];
  return?: any;
}

export type VARS = Record<string, any> | string | any[];

export interface Actions {
  [key: string]: ($data: IVars, params?: any) => any;
}
export interface Helpers {
  [key: string]: (...params: any[]) => any;
}

export type TaskRunnerConstructor = {
  actions: Actions;
  helpers: Helpers;
  vars?: IVars;
  name?: string;
};

export type IVars = Record<string, any>;

export interface TaskEmitter {
  vars: IVars;
  helpers: Helpers;
  $$serviceName: string;
}
