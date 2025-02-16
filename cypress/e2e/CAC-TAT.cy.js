const { faker } = require("@faker-js/faker");
const { phone_number } = require("faker/lib/locales/az");
const { cell_phone } = require("faker/lib/locales/pt_PT");
const Phone = require("faker/lib/phone_number");

const elements = {
  labelFirstName: "[for=firstName]",
  inputFirstName: "[id=firstName]",
  labelLastName: "[for=lastName]",
  inputLastName: "[id=lastName]",
  labelEmail: "[for=email]",
  inputEmail: "[id=email]",
  labelPhone: "[for=phone]",
  inputPhone: "[id=phone]",
  spanPhone: ".phone-label-span.required-mark",
  labelMessage: "[for=open-text-area]",
  textAreaMessage: "[id=open-text-area]",
  requiredMark: "[class=required-mark]",
  expectedRequired: "(obrigatório)",
  buttonSubmit: "[type=submit]",
  expectedSubmit: "Enviar",
  spamSuccess: "[class=success]",
  expectedSuccess: "Mensagem enviada com sucesso.",
  spamError: "[class=error]",
  expectedError: "Valide os campos obrigatórios!",
};

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const validEmail = faker.internet.email({
  firstName: firstName.toLowerCase(),
  lastName: lastName.toLowerCase(),
});
const invalidEmail = validEmail.replace("@", "#");
//const phone = faker.finance.accountNumber(11)
const phone = cell_phone;
const message = faker.lorem.paragraph(2);

class MessageForm {
  preencherCamposObrigatorios(firstName, lastName, email, phone, message) {
    cy.get(elements.labelFirstName).then(() => {
      if (
        cy
          .get(elements.requiredMark)
          .should("be.visible")
          .contains(elements.expectedRequired)
      ) {
        cy.get(elements.inputFirstName).type(firstName);
      }
    });

    cy.get(elements.labelLastName).then(() => {
      if (
        cy
          .get(elements.requiredMark)
          .should("be.visible")
          .contains(elements.expectedRequired)
      ) {
        cy.get(elements.inputLastName).type(lastName);
      }
    });

    cy.get(elements.labelEmail).then(() => {
      if (
        cy
          .get(elements.requiredMark)
          .should("be.visible")
          .contains(elements.expectedRequired)
      ) {
        cy.get(elements.inputEmail).type(email);
      }
    });

    cy.get(elements.labelPhone).then(() => {
      cy.get(elements.spanPhone).then(($span) => {
        if ($span.is(":visible")) {
          cy.get(elements.inputPhone).type(phone);
        }
      });
    });

    cy.get(elements.labelMessage).then(() => {
      if (
        cy
          .get(elements.requiredMark)
          .should("be.visible")
          .contains(elements.expectedRequired)
      ) {
        cy.get(elements.textAreaMessage).type(message, { delay: 0 });
      }
    });
  }
  enviarMensagem() {
    cy.get(elements.buttonSubmit).contains(elements.expectedSubmit).click();
  }
  validarMensagemSucesso() {
    cy.get(elements.spamSuccess).contains(elements.expectedSuccess).click();
  }
  validarMensagemErro() {
    cy.get(elements.spamError).contains(elements.expectedError).click();
  }
  enviarMensagemComSucesso() {
    this.preencherCamposObrigatorios(
      firstName,
      lastName,
      validEmail,
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
      invalidEmail,
      phone,
      message
    );
    this.enviarMensagem();
    this.validarMensagemErro();
  }
  bloquearMensagemSemNome() {
    this.preencherCamposObrigatorios(
      " ",
      lastName,
      invalidEmail,
      phone,
      message
    );
    this.enviarMensagem();
    this.validarMensagemErro();
  }
  bloquearMensagemSemSobreNome() {
    this.preencherCamposObrigatorios(
      firstName,
      " ",
      invalidEmail,
      phone,
      message
    );
    this.enviarMensagem();
    this.validarMensagemErro();
  }
  bloquearMensagemSemEmail() {
    this.preencherCamposObrigatorios(firstName, lastName, " ", phone, message);
    this.enviarMensagem();
    this.validarMensagemErro();
  }
}

describe("Central de Atendimento ao Cliente TAT", () => {
  const msgForm = new MessageForm();

  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("Acessar a pagina Central de Atendimento ao Cliente TAT", () => {
    cy.title().should("equal", "Central de Atendimento ao Cliente TAT");
  });

  it("Enviar mensagem com sucesso", () => {
    msgForm.enviarMensagemComSucesso();
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
});
