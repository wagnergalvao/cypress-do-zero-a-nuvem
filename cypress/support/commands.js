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

Cypress.Commands.add("accessPage", (visit, validateTitle) => {
  const { pageData } = require("./objects.js");

  if (visit) {
    cy.visit(pageData.baseUrl);
  }

  if (validateTitle) {
    cy.title().should("eq", pageData.title);
  }
});

Cypress.Commands.add("validateFormTitle", () => {
  const { formTitle } = require("./objects.js");

  cy.contains(formTitle.titleSelector, formTitle.titleContains).should(
    "be.visible"
  );

  cy.contains(formTitle.subTitleSelector, formTitle.subTitleContais).should(
    "be.visible"
  );
});

Cypress.Commands.add("validateRequiredMark", (index, visible) => {
  const { requiredMark } = require("./objects.js");

  cy.get(requiredMark.spanSelector)
    .eq(index)
    .then(($span) => {
      const spanText = $span.text().trim();
      expect(spanText).to.eq(requiredMark.spanContains);
      if (visible) {
        cy.wrap($span).should("be.visible");
      }
    });
});

Cypress.Commands.add("validateFirstName", () => {
  const { firstName } = require("./objects.js");

  cy.contains(firstName.labelSelector, firstName.labelContains).should(
    "be.visible"
  );

  cy.validateRequiredMark(0, true);

  cy.get(firstName.inputSelector);
});

Cypress.Commands.add("validateLastName", () => {
  const { lastName } = require("./objects.js");

  cy.contains(lastName.labelSelector, lastName.labelContains).should(
    "be.visible"
  );

  cy.validateRequiredMark(1, true);

  cy.get(lastName.inputSelector);
});

Cypress.Commands.add("validateEmail", () => {
  const { email } = require("./objects.js");

  cy.contains(email.labelSelector, email.labelContains).should("be.visible");

  cy.validateRequiredMark(2, true);

  cy.get(email.inputSelector);
});

Cypress.Commands.add("validatePhone", (visible) => {
  const { phone } = require("./objects.js");

  cy.contains(phone.labelSelector, phone.labelContains).should("be.visible");

  cy.validateRequiredMark(3, visible);

  //  cy.get(phone.inputSelector);
  cy.get(phone.inputSelector).then(($input) => {
    if (visible) {
      $input.should("have.attr", "required");
    }
  });
});

Cypress.Commands.add("ValidateFormElements", () => {
  cy.validateFormTitle();
  cy.validateFirstName();
  cy.validateLastName();
  cy.validateEmail();
  cy.validatePhone();
});

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

Cypress.Commands.add("validateSupportTypeOptions", (elements) => {
  cy.contains(elements.supportTypeElement, elements.supportTypeText);
  cy.get(elements.supportTypeInput).each(($input, index) => {
    cy.wrap($input).should("have.value", elements.supportTypeValues[index]);
    cy.wrap($input)
      .parent()
      .then(($item) => {
        expect($item.text().trim()).to.equal(elements.supportTypeTexts[index]);
      });
  });
});

Cypress.Commands.add("selectSupportType", (elements, supportOption) => {
  cy.contains(
    elements.supportTypeElement,
    elements.supportTypeText[supportOption]
  );
  cy.get(elements.supportTypeInput)
    .check(elements.supportTypeValues[supportOption])
    .then(($input) => {
      expect($input).to.have.value(elements.supportTypeValues[supportOption]);
      cy.wrap($input)
        .parent()
        .then(($item) => {
          expect($item.text().trim()).to.equal(
            elements.supportTypeTexts[supportOption]
          );
        });
    });
});

Cypress.Commands.add("validateOptions", (elements) => {
  cy.contains(elements.divSupportType, elements.expectedSuppTy);
  cy.get(elements.inputSupportTp).each(($input, index) => {
    cy.wrap($input).should("have.value", elements.optionsSuppTyp[index]);
    cy.wrap($input)
      .parent()
      .then(($item) => {
        expect($item.text().trim()).to.equal(elements.expectedSuppTp[index]);
      });
  });
});
