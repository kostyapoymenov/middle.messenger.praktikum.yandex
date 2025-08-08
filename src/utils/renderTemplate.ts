import Handlebars from "handlebars";

export const renderTemplate = (elem: HTMLElement, template: string, options: object = {}) => {
  const compileTemplate = Handlebars.compile(template);
  elem.innerHTML = compileTemplate(options);
};
