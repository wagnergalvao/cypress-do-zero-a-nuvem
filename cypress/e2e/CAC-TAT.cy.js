import { fakerPT_BR as faker } from "@faker-js/faker";
const elements = {
  labelFirstName: "[for=firstName]",
  expectedLblFN: "Nome",
  inputFirstName: "[id=firstName]",
  labelLastName: "[for=lastName]",
  expectedLblLN: "Sobrenome",
  inputLastName: "[id=lastName]",
  expectedLblEm: "E-mail",
  labelEmail: "[for=email]",
  inputEmail: "[id=email]",
  labelPhone: "[for=phone]",
  expectedLblPh: "Telefone",
  inputPhone: "[id=phone]",
  spanPhone: ".phone-label-span.required-mark",
  labelPhoneCheckbox: "[for=phone-checkbox]",
  inputPhoneCheckbox: "[id=phone-checkbox]",
  labelMessage: "[for=open-text-area]",
  expectedLblT1: "Como podemos te ajudar? ",
  expectedLblT2: "Algum elogio ou feedback para nós?",
  textAreaMessage: "[id=open-text-area]",
  requiredMark: "[class=required-mark]",
  expectedRequired: "(obrigatório)",
  labelProduct: "[for=product]",
  expectedLblPr: "Produto",
  selectProduct: "[id=product]",
  selectedOptPr: "select#product option:selected",
  optionsProduct: ["Selecione", "blog", "cursos", "mentoria", "youtube"],
  expectedProduct: ["Selecione", "Blog", "Cursos", "Mentoria", "YouTube"],
  supportTypeElement: "[id=support-type]",
  supportTypeText: "Tipo de atendimento",
  supportTypeInput: "[type=radio]",
  supportTypeValues: ["ajuda", "elogio", "feedback"],
  supportTypeTexts: ["Ajuda", "Elogio", "Feedback"],
  supportTypeChecked: 'input[type="radio"]:checked',
  preferredContactElement: "[id=check]",
  preferredContactText: "Qual seu meio de contato preferencial?",
  preferredContactInput: "[type=checkbox]",
  preferredContactValues: ["email", "phone"],
  preferredContactTexts: ["E-mail", "Telefone"],
  buttonSubmit: "[type=submit]",
  expectedSubmit: "Enviar",
  spanSuccess: "[class=success]",
  expectedSuccess: "Mensagem enviada com sucesso.",
  spanError: "[class=error]",
  expectedError: "Valide os campos obrigatórios!",
};
var firstName = null;
var lastName = null;
var email = null;
var phone = null;
var message = null;
var productOption = (Date.now() % 4) + 1;
var supportOption = Date.now() % 3;

class MessageForm {
  gerarDadosFake() {
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    email = faker.internet.email({
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
    });
    phone = faker.phone.number({ style: "national" });
    message = faker.lorem.paragraph(2);
  }
  preencherCamposObrigatorios(firstName, lastName, email, phone, message) {
    if (firstName !== null) {
      cy.contains(elements.labelFirstName, elements.expectedLblFN).then(() => {
        cy.contains(elements.requiredMark, elements.expectedRequired).should(
          "be.visible"
        );
        cy.get(elements.inputFirstName).type(firstName);
      });
    }

    if (lastName !== null) {
      cy.contains(elements.labelLastName, elements.expectedLblLN).then(() => {
        cy.contains(elements.requiredMark, elements.expectedRequired).should(
          "be.visible"
        );
        cy.get(elements.inputLastName).type(lastName);
      });
    }

    if (email !== null) {
      cy.contains(elements.labelEmail, elements.expectedLblEm).then(() => {
        cy.contains(elements.requiredMark, elements.expectedRequired).should(
          "be.visible"
        );
        cy.get(elements.inputEmail).type(email);
      });
    }

    if (phone !== null) {
      cy.contains(elements.labelPhone, elements.expectedLblPh).then(() => {
        if (
          cy
            .contains(elements.requiredMark, elements.expectedRequired)
            .should("be.visible")
        ) {
          cy.get(elements.inputPhone).type(phone);
        }
      });
    }

    if (message !== null) {
      cy.contains(elements.labelMessage, elements.expectedLblT1);
      cy.contains(elements.labelMessage, elements.expectedLblT2).then(() => {
        cy.contains(elements.requiredMark, elements.expectedRequired).should(
          "be.visible"
        );
        cy.get(elements.textAreaMessage).type(message, {
          delay: 0,
        });
      });
    }
  }
  enviarMensagem() {
    cy.contains(elements.buttonSubmit, elements.expectedSubmit).click();
  }
  validarMensagemSucesso() {
    cy.contains(elements.spanSuccess, elements.expectedSuccess).should(
      "be.visible"
    );
  }
  validarMensagemErro() {
    cy.contains(elements.spanError, elements.expectedError).should(
      "be.visible"
    );
  }
  enviarMensagemComSucesso() {
    this.preencherCamposObrigatorios(
      firstName,
      lastName,
      email,
      phone,
      message
    );
    this.enviarMensagem();
    this.validarMensagemSucesso();
  }
  enviarMensagemComTelefoneObrigatorio() {
    this.marcarTelefoneCheckbox();
    this.preencherCamposObrigatorios(
      firstName,
      lastName,
      email,
      phone,
      message
    );
    this.enviarMensagem();
    this.validarMensagemSucesso();
  }
  bloquearMensagemSemCamposObrigatorios() {
    this.enviarMensagem();
    this.validarMensagemErro();
  }
  bloquearMensagemComEmailInvalido() {
    this.preencherCamposObrigatorios(
      firstName,
      lastName,
      email.replace("@", "#"),
      phone,
      message
    );
    this.enviarMensagem();
    this.validarMensagemErro();
  }
  aceitarSomenteNumerosNoTelefone() {
    this.marcarTelefoneCheckbox();
    this.preencherCamposObrigatorios(
      null,
      null,
      null,
      phone,
      "Telefone digitado: " + phone
    );
  }
  bloquearMensagemSemNome() {
    this.preencherCamposObrigatorios(null, lastName, email, phone, message);
    this.enviarMensagem();
    this.validarMensagemErro();
  }
  bloquearMensagemSemSobreNome() {
    this.preencherCamposObrigatorios(firstName, null, email, phone, message);
    this.enviarMensagem();
    this.validarMensagemErro();
  }
  bloquearMensagemSemEmail() {
    this.preencherCamposObrigatorios(firstName, lastName, null, phone, message);
    this.enviarMensagem();
    this.validarMensagemErro();
  }
  bloquearMensagemSemMensagem() {
    this.preencherCamposObrigatorios(firstName, lastName, email, phone, null);
    this.enviarMensagem();
    this.validarMensagemErro();
  }
  marcarTelefoneCheckbox() {
    cy.get(elements.labelPhoneCheckbox).then(() => {
      cy.get(elements.inputPhoneCheckbox).then(($checkBox) => {
        if ($checkBox.is(":visible") && !$checkBox.is(":checked")) {
          cy.get(elements.inputPhoneCheckbox).check();
        }
      });
    });
  }
  desmarcarTelefoneCheckbox() {
    cy.get(elements.labelPhoneCheckbox).then(() => {
      cy.get(elements.inputPhoneCheckbox).then(($checkBox) => {
        if ($checkBox.is(":visible") && $checkBox.is(":checked")) {
          cy.get(elements.inputPhoneCheckbox).check();
        }
      });
    });
  }
  limparCamposDigitados() {
    if (cy.get(elements.inputFirstName)) {
      cy.get(elements.inputFirstName).clear();
    }
    if (cy.get(elements.inputLastName)) {
      cy.get(elements.inputLastName).clear();
    }
    if (cy.get(elements.inputEmail)) {
      cy.get(elements.inputEmail).clear();
    }
    if (cy.get(elements.inputPhone)) {
      cy.get(elements.inputPhone).clear();
    }
    if (cy.get(elements.textAreaMessage)) {
      cy.get(elements.textAreaMessage).clear();
    }
  }
  trocarDadosDoUsuarioDigitado() {
    this.preencherCamposObrigatorios(firstName, lastName, email, phone, null);
    this.limparCamposDigitados();
    this.desmarcarTelefoneCheckbox();
    this.gerarDadosFake();
    this.marcarTelefoneCheckbox();
    this.preencherCamposObrigatorios(
      firstName,
      lastName,
      email,
      phone,
      message
    );
  }
}
describe("Central de Atendimento ao Cliente TAT", () => {
  const msgForm = new MessageForm();

  beforeEach(() => {
    msgForm.gerarDadosFake();
    cy.accessPage(true, false);
  });

  it.only("Acessar a pagina Central de Atendimento ao Cliente TAT", () => {
    cy.accessPage(false, true);
  });

  it.only("Validar elementos do formulário", () => {
    cy.ValidateFormElements();
  });

  it("Enviar mensagem com sucesso", () => {
    msgForm.enviarMensagemComSucesso();
  });

  it("Aceitar somente números no telefone", () => {
    msgForm.aceitarSomenteNumerosNoTelefone();
  });

  it("Enviar mensagem com telefone obrigatório", () => {
    msgForm.enviarMensagemComTelefoneObrigatorio();
  });

  it("Trocar dados do usuário e enviar a mensagem com o novo usuário", () => {
    msgForm.trocarDadosDoUsuarioDigitado();
    msgForm.enviarMensagem();
    msgForm.validarMensagemSucesso();
  });

  it("Bloquear mensagem sem campos obrigatórios", () => {
    msgForm.bloquearMensagemSemCamposObrigatorios();
  });

  it("Bloquear mensagem com email inválido", () => {
    msgForm.bloquearMensagemComEmailInvalido();
  });

  it("Bloquear mensagem sem nome", () => {
    msgForm.bloquearMensagemSemNome();
  });

  it("Bloquear mensagem sem sobrenome", () => {
    msgForm.bloquearMensagemSemSobreNome();
  });

  it("Bloquear mensagem sem email", () => {
    msgForm.bloquearMensagemSemEmail();
  });

  it("Bloquear mensagem sem texto", () => {
    msgForm.bloquearMensagemSemCamposObrigatorios();
  });

  it("Enviar mensagem com sucesso usando custom commands", () => {
    cy.submitForm(elements, firstName, lastName, email, phone, message);
    cy.contains(elements.spanSuccess, elements.expectedSuccess).should(
      "be.visible"
    );
  });

  it("Bloquar mensagem com email inválido usando custom commands", () => {
    cy.submitForm(
      elements,
      firstName,
      lastName,
      email.replace("@", "#"),
      phone,
      message
    );
    cy.contains(elements.spanError, elements.expectedError).should(
      "be.visible"
    );
  });

  it(`Enviar mensagem sobre o produto ${elements.expectedProduct[productOption]} selecionado por seu Texto`, () => {
    cy.selectProduct(elements, "Text", productOption);

    cy.submitForm(elements, firstName, lastName, email, phone, message);

    cy.contains(elements.spanSuccess, elements.expectedSuccess).should(
      "be.visible"
    );
  });

  it(`Enviar mensagem sobre o produto ${elements.expectedProduct[productOption]} selecionado por seu Value`, () => {
    cy.selectProduct(elements, "", productOption);

    cy.submitForm(elements, firstName, lastName, email, phone, message);

    cy.contains(elements.spanSuccess, elements.expectedSuccess).should(
      "be.visible"
    );
  });

  it(`Enviar mensagem sobre o produto ${elements.expectedProduct[productOption]} selecionado por seu Índice`, () => {
    cy.selectProduct(elements, "Index", productOption);

    cy.submitForm(elements, firstName, lastName, email, phone, message);

    cy.contains(elements.spanSuccess, elements.expectedSuccess).should(
      "be.visible"
    );
  });

  it("Validar todas as opções do Tipo de atendimento", () => {
    cy.validateSupportTypeOptions(elements);
  });

  it(`Enviar mensagem sobre o tipo de atendimento ${elements.supportTypeTexts[supportOption]}`, () => {
    cy.selectSupportType(elements, supportOption);

    cy.selectProduct(elements, "Index", productOption);

    cy.submitForm(elements, firstName, lastName, email, phone, message);

    cy.contains(elements.spanSuccess, elements.expectedSuccess).should(
      "be.visible"
    );
  });
});
