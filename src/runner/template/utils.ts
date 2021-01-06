export const trim = (template: string) => template.replace("\\s+", " ");
export const isTemplate = (template: string) => !!template.match("^{{.+}}$");
