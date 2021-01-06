/**
 * template: {{ }} - ^{{.+}}$
 * raw value: {{ 'raw_value' }} - ^\\'(?<value>[\\w\\s\\"]+)\\'
 * variable: {{ $var_name }} - ^\\$(?<value>\\w+)
 * global variable: {{ $$var_name }} - ^\\$\\$(?<value>\\w+)
 * function: {{ @functionName }} - ^\\@(?<value>\\w+)
 * function with value param: {{ @functionName 'raw_value' }}
 * function with variable param: {{ @functionName $var_name }}
 * function with global variable param: {{ @functionName $$var_name }}
 *
 * Steps:
 * 1. Trim - get rid of redundant spaces
 * 2. Run lexer
 */

import { Some, None, Option } from "@/utils/monad";
import { Definition, Types, RuleMatch } from "../types";
import { isTemplate, trim } from "./utils";
import rules from "./rules";

const registerRule = (definition: Definition) => (
  input: string
): Option<RuleMatch> => {
  const match = input.match(definition.regex);
  if (match) {
    return Some({
      type: definition.type,
      value: match[0],
      extended: match
    });
  } else {
    return None();
  }
};

const registerAll = (definitions: Definition[]) => {
  return definitions.map(definition => registerRule(definition));
};

const match = (input: string) => {
  const [matched] = registerAll(rules)
    .map(matcher => matcher(input))
    .filter(res => res.isSome());

  return matched;
};

export const tokenize = (input: string): RuleMatch[] | null => {
  if (!isTemplate(input)) return null;
  input = trim(input);

  const tokens: RuleMatch[] = [];
  let index = 0;

  while (index < input.length) {
    const matched = match(input.substr(index));

    matched.match({
      some(token) {
        if (token.type !== Types.WHITESPACE) {
          tokens.push(token);
        }

        index += token.value.length;
      },
      none: null
    });
  }

  return tokens;
};
