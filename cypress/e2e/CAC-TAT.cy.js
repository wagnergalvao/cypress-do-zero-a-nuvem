const { faker } = require("@faker-js/faker");

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

class MessageForm {
  preencherCamposObrigatorios() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

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
        cy.get(elements.inputEmail).type(
          faker.internet.email({
            firstName: firstName.toLowerCase(),
            lastName: lastName.toLowerCase(),
          })
        );
      }
    });

    cy.get(elements.labelPhone).then(() => {
      cy.get(elements.spanPhone).then(($span) => {
        if ($span.is(":visible")) {
          cy.get(elements.inputPhone).type(faker.finance.accountNumber(11));
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
        cy.get(elements.textAreaMessage).type(faker.lorem.paragraph(2));
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
    msgForm.preencherCamposObrigatorios();
    msgForm.enviarMensagem();
    msgForm.validarMensagemSucesso();
  });

  it("Bloquear mensagem sem campos obrigaórios", () => {
    msgForm.enviarMensagem();
  });
});
