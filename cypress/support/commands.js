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

Cypress.Commands.add("getFieldValue", (selector) => {
  return cy.get(selector).invoke("val");
});

Cypress.Commands.add("setFieldValue", (selector, value, clearField) => {
  if (clearField) {
    cy.get(selector).clear().type(value);
  } else {
    cy.get(selector).type(value);
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

Cypress.Commands.add(
  "validateRequiredMark",
  (requiredSelector, requiredContains, visible) => {
    if (visible) {
      cy.get(requiredSelector)
        .should("be.visible")
        .then(($spanSelector) => {
          const spanText = $spanSelector.text().trim();
          expect(spanText).to.eq(requiredContains);
        });
    }
  }
);

Cypress.Commands.add("validateFirstName", () => {
  const { firstName } = require("./objects.js");

  cy.contains(firstName.labelSelector, firstName.labelContains).should(
    "be.visible"
  );

  cy.validateRequiredMark(
    firstName.requiredSelector,
    firstName.requiredContains,
    true
  );

  cy.get(firstName.inputSelector);
});

Cypress.Commands.add("validateLastName", () => {
  const { lastName } = require("./objects.js");

  cy.contains(lastName.labelSelector, lastName.labelContains).should(
    "be.visible"
  );

  cy.validateRequiredMark(
    lastName.requiredSelector,
    lastName.requiredContains,
    true
  );

  cy.get(lastName.inputSelector);
});

Cypress.Commands.add("validateEmail", () => {
  const { email } = require("./objects.js");

  cy.contains(email.labelSelector, email.labelContains).should("be.visible");

  cy.validateRequiredMark(email.requiredSelector, email.requiredContains, true);

  cy.get(email.inputSelector);
});

Cypress.Commands.add("validatePhone", (visible) => {
  const { phone } = require("./objects.js");

  cy.contains(phone.labelSelector, phone.labelContains).should("be.visible");

  cy.validateRequiredMark(
    phone.requiredSelector,
    phone.requiredContains,
    visible
  );

  if (visible) {
    cy.get(phone.inputSelector).should("have.attr", "required");
  } else {
    cy.get(phone.inputSelector);
  }
});

Cypress.Commands.add("validateProduct", () => {
  const { product } = require("./objects.js");

  cy.contains(product.labelSelector, product.labelContains).should(
    "be.visible"
  );

  cy.get(product.selectSelector).should("be.visible");

  cy.wrap(product.optionSelectorList).each(($optionSelector, index) => {
    cy.contains($optionSelector, product.optionContentList[index]);
  });
});

Cypress.Commands.add("validateSelectedProduct", (index) => {
  const { product } = require("./objects.js");
  cy.get(product.optionSelectorSelected)
    .should("have.value", product.optionValueList[index])
    .then(($option) => {
      expect($option.text().trim()).to.equal(product.optionContentList[index]);
    });
});

Cypress.Commands.add("validateSupport", () => {
  const { support } = require("./objects.js");

  cy.contains(support.divSelector, support.divContains).should("be.visible");

  cy.wrap(support.inputSelectorList).each((inputSelector, index) => {
    cy.get(inputSelector)
      .should("be.visible")
      .and("contain", support.inputContentList[index]);
  });
});

Cypress.Commands.add("validateCheckedSupport", (index) => {
  const { support } = require("./objects.js");
  cy.get(support.inputSelectorChecked)
    .should("have.value", support.inputValueList[index])
    .then(($input) => {
      cy.wrap($input)
        .parent()
        .then(($item) => {
          expect($item.text().trim()).to.equal(support.inputContentList[index]);
        });
    });
});

Cypress.Commands.add("validateContact", () => {
  const { contact } = require("./objects.js");

  cy.contains(contact.divSelector, contact.divContains).should("be.visible");

  cy.wrap(contact.inputSelectorList).each((inputSelector) => {
    cy.get(inputSelector).should("be.visible");
  });

  cy.wrap(contact.labelSelectorList).each((labelSelector, index) => {
    cy.contains(labelSelector, contact.labelContentList[index]);
  });
});

Cypress.Commands.add("validateMessage", () => {
  const { message } = require("./objects.js");

  cy.contains(message.labelSelector, message.labelContains).should(
    "be.visible"
  );

  cy.validateRequiredMark(
    message.requiredSelector,
    message.requiredContains,
    true
  );

  cy.get(message.textareaSelector);
});

Cypress.Commands.add("validateFileUpload", () => {
  const { fileUpload } = require("./objects.js");

  cy.contains(fileUpload.labelSelector, fileUpload.labelContains).should(
    "be.visible"
  );

  cy.get(fileUpload.inputSelector);
});

Cypress.Commands.add("validateSubmitButton", () => {
  const { submitButton } = require("./objects.js");
  cy.contains(submitButton.buttonSelector, submitButton.buttonContains).should(
    "be.visible"
  );
});

Cypress.Commands.add("validateprivacyPolicy", () => {
  const { privacyPolicy } = require("./objects.js");
  cy.contains(privacyPolicy.linkSelector, privacyPolicy.linkContains).should(
    "be.visible"
  );
});

Cypress.Commands.add("ValidateFormElements", () => {
  cy.validateFormTitle();
  cy.validateFirstName();
  cy.validateLastName();
  cy.validateEmail();
  cy.validatePhone();
  cy.validateProduct();
  cy.validateSelectedProduct(0);
  cy.validateSupport();
  cy.validateCheckedSupport(0);
  cy.validateContact();
  cy.validateMessage();
  cy.validateFileUpload();
  cy.validateSubmitButton();
  cy.validateprivacyPolicy();
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
