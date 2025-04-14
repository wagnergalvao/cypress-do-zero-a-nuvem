import {
  simulatedData,
  submitButton,
  phone,
  fileUpload,
} from "../support/objects.js";

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.accessPage(true, false);
  });

  it("Acessar a pagina Central de Atendimento ao Cliente TAT", () => {
    cy.accessPage(false, true);
  });

  it("Validar elementos do formulário", () => {
    cy.ValidateFormElements();
  });

  it("Enviar mensagem com sucesso", () => {
    cy.submitForm(
      {
        name: "firstName",
        content: simulatedData.firstName,
        clearField: false,
      },
      { name: "lastName", content: simulatedData.lastName, clearField: false },
      { name: "email", content: simulatedData.email, clearField: false },
      { name: "product", content: simulatedData.productIndex },
      { name: "support", content: simulatedData.supportIndex },
      { name: "contact", content: "all", uncheck: false },
      {
        name: "phone",
        content: simulatedData.requiredPhone,
        clearField: false,
      },
      { name: "message", content: simulatedData.message, clearField: false },
      {},
      true
    );
    cy.validateSuccessMessage();
  });

  it("Aceitar somente números no telefone", () => {
    cy.submitForm(
      {},
      {},
      {},
      {},
      {},
      { name: "contact", content: 1, uncheck: false },
      { name: "phone", content: "Número do Telefone", clearField: false },
      {
        name: "message",
        content: "Telefone digitado: Número do Telefone",
        clear: false,
      },
      {},
      false
    );
    cy.getFieldText(phone.inputSelector).should("be.empty");
  });

  it("Enviar mensagem com telefone obrigatório", () => {
    cy.submitForm(
      {
        name: "firstName",
        content: simulatedData.firstName,
        clearField: false,
      },
      { name: "lastName", content: simulatedData.lastName, clearField: false },
      { name: "email", content: simulatedData.email, clearField: false },
      {},
      {},
      { name: "contact", content: 1, uncheck: false },
      {
        name: "phone",
        content: simulatedData.requiredPhone,
        clearField: false,
      },
      { name: "message", content: simulatedData.message, clearField: false },
      {
        name: "files",
        content: fileUpload.inputFilesNames[simulatedData.fileIndex],
        clearField: false,
      },
      true
    );
    cy.validateSuccessMessage();
  });

  it("Trocar dados do usuário e enviar a mensagem com o novo usuário", () => {
    cy.submitForm(
      { name: "firstName", content: "José", clearField: false },
      { name: "lastName", content: "Silva", clearField: false },
      { name: "email", content: "jose_silva@email.com", clearField: false },
      {},
      {},
      {},
      {},
      { name: "message", content: "Mensagem errada", clearField: false },
      {},
      false
    );
    cy.submitForm(
      { name: "firstName", content: simulatedData.firstName, clearField: true },
      { name: "lastName", content: simulatedData.lastName, clearField: true },
      { name: "email", content: simulatedData.email, clearField: true },
      { name: "product", content: simulatedData.productIndex },
      { name: "support", content: simulatedData.supportIndex },
      { name: "contact", content: 1, uncheck: false },
      {
        name: "phone",
        content: simulatedData.requiredPhone,
        clearField: false,
      },
      { name: "message", content: simulatedData.message, clearField: true },
      {},
      true
    );
    cy.validateSuccessMessage();
  });

  it("Enviar mensagem com anexo selecionado", () => {
    cy.submitForm(
      {
        name: "firstName",
        content: simulatedData.firstName,
        clearField: false,
      },
      { name: "lastName", content: simulatedData.lastName, clearField: false },
      { name: "email", content: simulatedData.email, clearField: false },
      { name: "product", content: simulatedData.productIndex },
      { name: "support", content: simulatedData.supportIndex },
      { name: "contact", content: "all", uncheck: false },
      {
        name: "phone",
        content: simulatedData.requiredPhone,
        clearField: false,
      },
      { name: "message", content: simulatedData.message, clearField: false },
      {
        name: "files",
        content: fileUpload.inputFilesNames[simulatedData.fileIndex],
        clearField: false,
      },
      true
    );
    cy.validateSuccessMessage();
  });

  it("Enviar mensagem com anexo arrastado", () => {
    cy.submitForm(
      {
        name: "firstName",
        content: simulatedData.firstName,
        clearField: false,
      },
      { name: "lastName", content: simulatedData.lastName, clearField: false },
      { name: "email", content: simulatedData.email, clearField: false },
      { name: "product", content: simulatedData.productIndex },
      { name: "support", content: simulatedData.supportIndex },
      { name: "contact", content: "all", uncheck: false },
      {
        name: "phone",
        content: simulatedData.requiredPhone,
        clearField: false,
      },
      { name: "message", content: simulatedData.message, clearField: false },
      {
        name: "files",
        content: fileUpload.inputFilesNames[simulatedData.fileIndex],
        clearField: false,
        dragDrop: true,
      },
      true
    );
    cy.validateSuccessMessage();
  });

  it("Bloquear mensagem sem campos obrigatórios", () => {
    cy.clickElement(submitButton.buttonSelector);
    cy.validateErrorMessage();
  });

  it("Bloquear mensagem com email inválido", () => {
    cy.submitForm(
      {
        name: "firstName",
        content: simulatedData.firstName,
        clearField: false,
      },
      { name: "lastName", content: simulatedData.lastName, clearField: false },
      {
        name: "email",
        content: simulatedData.email.replace("@", "#"),
        clearField: false,
      },
      { name: "product", content: simulatedData.productIndex },
      { name: "support", content: simulatedData.supportIndex },
      { name: "contact", content: 1, uncheck: false },
      {
        name: "phone",
        content: simulatedData.requiredPhone,
        clearField: false,
      },
      { name: "message", content: simulatedData.message, clearField: false },
      {},
      {},
      true
    );
    cy.validateErrorMessage();
  });

  it("Bloquear mensagem sem nome", () => {
    cy.submitForm(
      {},
      { name: "lastName", content: simulatedData.lastName, clearField: false },
      { name: "email", content: simulatedData.email, clearField: false },
      { name: "product", content: simulatedData.productIndex },
      { name: "support", content: simulatedData.supportIndex },
      { name: "contact", content: 1, uncheck: false },
      {
        name: "phone",
        content: simulatedData.requiredPhone,
        clearField: false,
      },
      { name: "message", content: simulatedData.message, clearField: false },
      {},
      true
    );
    cy.validateErrorMessage();
  });

  it("Bloquear mensagem sem sobrenome", () => {
    cy.submitForm(
      {
        name: "firstName",
        content: simulatedData.firstName,
        clearField: false,
      },
      {},
      { name: "email", content: simulatedData.email, clearField: false },
      { name: "product", content: simulatedData.productIndex },
      { name: "support", content: simulatedData.supportIndex },
      { name: "contact", content: 1, uncheck: false },
      {
        name: "phone",
        content: simulatedData.requiredPhone,
        clearField: false,
      },
      { name: "message", content: simulatedData.message, clearField: false },
      {},
      true
    );
    cy.validateErrorMessage();
  });

  it("Bloquear mensagem sem email", () => {
    cy.submitForm(
      {
        name: "firstName",
        content: simulatedData.firstName,
        clearField: false,
      },
      { name: "lastName", content: simulatedData.lastName, clearField: false },
      {},
      { name: "product", content: simulatedData.productIndex },
      { name: "support", content: simulatedData.supportIndex },
      { name: "contact", content: 1, uncheck: false },
      {
        name: "phone",
        content: simulatedData.requiredPhone,
        clearField: false,
      },
      { name: "message", content: simulatedData.message, clearField: false },
      {},
      true
    );
    cy.validateErrorMessage();
  });

  it("Bloquear mensagem sem telefone", () => {
    cy.submitForm(
      {
        name: "firstName",
        content: simulatedData.firstName,
        clearField: false,
      },
      { name: "lastName", content: simulatedData.lastName, clearField: false },
      { name: "email", content: simulatedData.email, clearField: false },
      { name: "product", content: simulatedData.productIndex },
      { name: "support", content: simulatedData.supportIndex },
      { name: "contact", content: 1, uncheck: false },
      {},
      { name: "message", content: simulatedData.message, clearField: false },
      {},
      true
    );
    cy.validateErrorMessage();
  });
  it("Bloquear mensagem sem texto", () => {
    cy.submitForm(
      {
        name: "firstName",
        content: simulatedData.firstName,
        clearField: false,
      },
      { name: "lastName", content: simulatedData.lastName, clearField: false },
      { name: "email", content: simulatedData.email, clearField: false },
      { name: "product", content: simulatedData.productIndex },
      { name: "support", content: simulatedData.supportIndex },
      { name: "contact", content: 1, uncheck: false },
      {
        name: "phone",
        content: simulatedData.requiredPhone,
        clearField: false,
      },
      {},
      {},
      true
    );
    cy.validateErrorMessage();
  });
});
