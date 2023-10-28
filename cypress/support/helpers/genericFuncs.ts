import inputFeild from "../interface/inputFeiled";

export const genericUsername = (name: string) => {
  return `${name}${genericString()}`;
};

export const genericEmail = (name: string) => {
  return `${name}${genericString()}@test.com`;
};

export const genericString = () => {
  return `${Math.floor(Math.random() * 1000000)}`;
};

export const typeInputField = (arr: inputFeild[]) => {
  arr.forEach((elem) => {
    elem.element.type(elem.str);
  });
};

export const uploadFile = (element: Cypress.Chainable<JQuery<HTMLElement>>, filePath: string) => {
  element.selectFile(filePath, { force: true });
}

export const getCurrentDate = () => {
  return new Date().toJSON().slice(0, 10)
}


