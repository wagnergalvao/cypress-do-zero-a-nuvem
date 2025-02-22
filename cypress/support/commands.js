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
    cy.get(elements.labelPhoneCheckbox).then(() => {
      cy.get(elements.inputPhoneCheckbox).then(($checkBox) => {
        if ($checkBox.is(":visible") && !$checkBox.is(":checked")) {
          cy.get(elements.inputPhoneCheckbox).check();
        }
      });
    });

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

    cy.get(elements.buttonSubmit).contains(elements.expectedSubmit).click();
  }
);
