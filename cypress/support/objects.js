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
  titleSelector: 'h1[id="title"]',
  titleContains: "CAC TAT",
  subTitleSelector: 'p[id="subtitle"]',
  subTitleContais: "Forneça o máximo de informações, por favor.",
};

const firstName = {
  labelSelector: 'label[for="firstName"] strong',
  labelContains: "Nome",
  requiredSelector: 'label[for="firstName"] span[class="required-mark"]',
  requiredContains: "(obrigatório)",
  inputSelector:
    'input[type="text"][name="firstName"][id="firstName"][required]',
};

const lastName = {
  labelSelector: 'label[for="lastName"] strong',
  labelContains: "Sobrenome",
  requiredSelector: 'label[for="lastName"] span[class="required-mark"]',
  requiredContains: "(obrigatório)",
  inputSelector: 'input[type="text"][name="lastName"][id="lastName"][required]',
};

const email = {
  labelSelector: 'label[for="email"] strong',
  labelContains: "E-mail",
  requiredSelector: 'label[for="email"] span[class="required-mark"]',
  requiredContains: "(obrigatório)",
  inputSelector: 'input[type="email"][name="email"][id="email"][required]',
};

const phone = {
  labelSelector: 'label[for="phone"] strong',
  labelContains: "Telefone",
  requiredSelector:
    'label[for="phone"] .phone-label-span.required-mark[style="display: inline;"]',
  requiredContains: "(obrigatório)",
  inputSelector: 'input[type="number"][name="phone"][id="phone"]',
};

const product = {
  labelSelector: 'label[for="product"] strong',
  labelContains: "Produto",
  selectSelector: 'select[id="product"]',
  optionSelectorList: [
    'option[selected][disabled][value=""]',
    'option[value="blog"]',
    'option[value="cursos"]',
    'option[value="mentoria"]',
    'option[value="youtube"]',
  ],
  optionValueList: ["selecione", "blog", "cursos", "mentoria", "youtube"],
  optionContentList: ["Selecione", "Blog", "Cursos", "Mentoria", "YouTube"],
};

const support = {
  divSelector: 'div[id="support-type"][class="field"] label strong',
  divContains: "Tipo de atendimento",
  inputSelectorList: [
    'label:has(input[type="radio"][name="atendimento-tat"][value="ajuda"][checked])',
    'label:has(input[type="radio"][name="atendimento-tat"][value="elogio"])',
    'label:has(input[type="radio"][name="atendimento-tat"][value="feedback"])',
  ],
  inputValueList: ["ajuda", "elogio", "feedback"],
  inputContentList: ["Ajuda", "Elogio", "Feedback"],
};

const contact = {
  divSelector: 'div[id="check"] label strong',
  divContains: "Qual seu meio de contato preferencial?",
  inputSelectorList: [
    'input[type="checkbox"][id="email-checkbox"][name="email"][value="email"]',
    'input[type="checkbox"][id="phone-checkbox"][name="phone"][value="phone"]',
  ],
  labelSelectorList: [
    'label[for="email-checkbox"]',
    'label[for="phone-checkbox"]',
  ],
  inputValueList: ["email", "phone"],
  labelContentList: ["E-mail", "Telefone"],
};

const message = {
  labelSelector: 'label[for="open-text-area"] strong',
  labelContains: "Como podemos te ajudar? Algum elogio ou feedback para nós?",
  requiredSelector: 'label[for="open-text-area"] span[class="required-mark"]',
  requiredContains: "(obrigatório)",
  textareaSelector:
    'textarea[row="6"][id="open-text-area"][name="open-text-area"][required]',
};

const fileUpload = {
  labelSelector: 'label[for="file-upload"] strong',
  labelContains: "Adicone um anexo",
  inputSelector: 'input[type="file"][id="file-upload"]',
};

const submitButton = {
  buttonSelector: 'button[type="submit"][class="button"]',
  buttonContains: "Enviar",
};

const privacyPolicy = {
  linkSelector: 'a[href="privacy.html"][target="_blank"]',
  linkContains: "Política de Privacidade",
};

module.exports = {
  pageData,
  formTitle,
  firstName,
  lastName,
  email,
  phone,
  product,
  support,
  contact,
  message,
  fileUpload,
  submitButton,
  privacyPolicy,
};
