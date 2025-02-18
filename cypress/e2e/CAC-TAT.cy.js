import { fakerPT_BR as faker } from "@faker-js/faker";
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
  labelPhoneCheckbox: "[for=phone-checkbox]",
  inputPhoneCheckbox: "[id=phone-checkbox]",
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
var firstName = null;
var lastName = null;
var email = null;
var notEmail = null;
var phone = null;
var message = null;

class MessageForm {
  preencherCamposObrigatorios(firstName, lastName, email, phone, message) {
    cy.get(elements.labelFirstName).then(() => {
      if (
        cy
          .get(elements.requiredMark)
          .should("be.visible")
          .contains(elements.expectedRequired)
      ) {
        if (firstName !== null) {
          cy.get(elements.inputFirstName).type(firstName);
        }
      }
    });

    cy.get(elements.labelLastName).then(() => {
      if (
        cy
          .get(elements.requiredMark)
          .should("be.visible")
          .contains(elements.expectedRequired)
      ) {
        if (lastName !== null) {
          cy.get(elements.inputLastName).type(lastName);
        }
      }
    });

    cy.get(elements.labelEmail).then(() => {
      if (
        cy
          .get(elements.requiredMark)
          .should("be.visible")
          .contains(elements.expectedRequired)
      ) {
        if (email !== null) {
          cy.get(elements.inputEmail).type(email);
        }
      }
    });

    cy.get(elements.labelPhone).then(() => {
      cy.get(elements.spanPhone).then(($span) => {
        if ($span.is(":visible")) {
          if (phone !== null) {
            cy.get(elements.inputPhone).type(phone.replace(/\D/g, ""));
          }
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
        if (message !== null) {
          cy.get(elements.textAreaMessage).type(message, {
            delay: 0,
          });
        }
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
      notEmail,
      phone,
      message
    );
    this.enviarMensagem();
    this.validarMensagemErro();
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
}
describe("Central de Atendimento ao Cliente TAT", () => {
  const msgForm = new MessageForm();

  beforeEach(() => {
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    email = faker.internet.email({
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
    });
    notEmail = email.replace("@", "#");
    phone = faker.phone.number({ style: "national" });
    message = faker.lorem.paragraph(2);
    cy.visit("./src/index.html");
  });

  it("Acessar a pagina Central de Atendimento ao Cliente TAT", () => {
    cy.title().should("equal", "Central de Atendimento ao Cliente TAT");
  });

  it("Enviar mensagem com sucesso", () => {
    msgForm.enviarMensagemComSucesso();
  });

  it("Enviar mensagem com telefone obrigatório", () => {
    msgForm.enviarMensagemComTelefoneObrigatorio();
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
});
