import { Definition, Types } from "../types";

export default [
  {
    type: Types.TEMPLATE_START,
    regex: `^{{`
  },
  {
    type: Types.WHITESPACE,
    regex: `^\\s+`
  },
  {
    type: Types.RAW_VALUE,
    regex: `^\\'(?<value>[\\w\\s\\"]+)\\'`
  },
  {
    type: Types.RAW_VALUE,
    regex: `^(?<value>\\d+)`
  },
  {
    type: Types.VARIABLE,
    regex: `^\\$(?<name>\\w+)`
  },
  {
    type: Types.GLOBAL_VARIABLE,
    regex: `^\\$\\$(?<name>[\\w\\.]+)`
  },
  {
    type: Types.FUNCTION,
    regex: `^\\@(?<name>\\w+)`
  },
  {
    type: Types.TEMPLATE_END,
    regex: `^}}$`
  }
] as Definition[];
