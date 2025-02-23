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
  (elements, firstName, lastName, email, phone, message, result) => {
    cy.contains(elements.labelFirstName, elements.expectedLblFN).then(() => {
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

    cy.contains(elements.labelLastName, elements.expectedLblLN).then(() => {
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

    cy.contains(elements.labelEmail, elements.expectedLblEm).then(() => {
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

    cy.contains(elements.labelPhone, elements.expectedLblPh).then(() => {
      cy.get(elements.spanPhone).then(($span) => {
        if ($span.is(":visible")) {
          if (phone !== null) {
            cy.get(elements.inputPhone).type(phone.replace(/\D/g, ""));
          }
        }
      });
    });

    cy.contains(elements.labelMessage, elements.expectedLblT1);
    cy.contains(elements.labelMessage, elements.expectedLblT2).then(() => {
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

    cy.contains(elements.buttonSubmit, elements.expectedSubmit).click();
  }
);
