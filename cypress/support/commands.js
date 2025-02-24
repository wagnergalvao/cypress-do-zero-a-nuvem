// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
  "submitForm",
  (elements, firstName, lastName, email, phone, message) => {
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

    cy.contains(elements.buttonSubmit, elements.expectedSubmit).click();
  }
);
Cypress.Commands.add(
  "selectProduct",
  (elements, selectionType, optionNumber) => {
    var option = null;
    cy.contains(elements.labelProduct, elements.expectedLblPr);
    switch (selectionType.toUpperCase()) {
      case "TEXT":
        option = elements.expectedProduct[optionNumber];
        break;
      case "INDEX":
        option = optionNumber;
        break;
      default:
        option = elements.optionsProduct[optionNumber];
        break;
    }
    cy.get(elements.selectProduct).select(option);
    cy.get(elements.selectedOptPr).should(
      "have.value",
      elements.optionsProduct[optionNumber]
    );
    cy.get(elements.selectedOptPr).should(
      "have.text",
      elements.expectedProduct[optionNumber]
    );
  }
);
