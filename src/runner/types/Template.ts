export interface Definition {
  type: string;
  regex: string;
}

export interface RuleMatch {
  type: string;
  value: string;
  extended: any;
}

export interface FUNCTION {
  type: Types.FUNCTION;
  name: string;
  args: any[];
}
export interface VARIABLE {
  type: Types.VARIABLE;
  name: string;
  value: any;
}

export interface GLOBAL_VARIABLE {
  type: Types.GLOBAL_VARIABLE;
  name: string;
  value: any;
}

export interface RAW_VALUE {
  type: Types.RAW_VALUE;
  value: any;
}

export type STATEMENT = FUNCTION | VARIABLE | GLOBAL_VARIABLE | RAW_VALUE;

export enum Types {
  TEMPLATE_START = "template_start",
  TEMPLATE_END = "template_end",
  WHITESPACE = "whitespace",
  RAW_VALUE = "raw_value",
  VARIABLE = "variable",
  GLOBAL_VARIABLE = "global_variable",
  FUNCTION = "function"
}
