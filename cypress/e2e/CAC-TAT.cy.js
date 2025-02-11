describe("Central de Atendimento ao Cliente TAT", () => {
  it("Acessar a pagina Central de Atendimento ao Cliente TAT", () => {
    cy.visit("./src/index.html");
    cy.title().should("equal", "Central de Atendimento ao Cliente TAT");
  });
});
