// ***********************************************
// Lista de elementos da Central de Atendimento ao Cliente TAT
// Cypress, do Zero à Nuvem
// https://www.udemy.com/course/testes-automatizados-com-cypress-basico
// ***********************************************
import { fakerPT_BR as faker } from "@faker-js/faker";

const pageData = {
  baseUrl: "../../src/index.html", // Caminho corrigido para acessar a pasta src
  title: "Central de Atendimento ao Cliente TAT",
};

const formTitle = {
  titleSelector: "h1#title",
  titleContains: "CAC TAT",
  subTitleSelector: "p#subtitle",
  subTitleContais: "Forneça o máximo de informações, por favor.",
};

const requiredMark = {
  spanSelector: "span.required-mark",
  spanContains: "(obrigatório)",
};

const firstName = {
  labelSelector: 'label[for="firstName"] strong',
  labelContains: "Nome",
  inputSelector:
    'input[type="text"][name="firstName"][id="firstName"][required]',
};

const lastName = {
  labelSelector: 'label[for="lastName"] strong',
  labelContains: "Sobrenome",
  inputSelector: 'input[type="text"][name="lastName"][id="lastName"][required]',
};

const email = {
  labelSelector: 'label[for="email"] strong',
  labelContains: "E-mail",
  inputSelector: 'input[type="email"][name="email"][id="email"][required]',
};

const phone = {
  labelSelector: 'label[for="phone"] strong',
  labelContains: "Telefone",
  inputSelector: 'input[type="number"][name="phone"][id="phone"]',
};

module.exports = {
  pageData,
  formTitle,
  requiredMark,
  firstName,
  lastName,
  email,
  phone,
};
