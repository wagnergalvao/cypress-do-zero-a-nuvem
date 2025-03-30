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

import { pageData } from "./objects.js";
import { formTitle } from "./objects.js";
import { firstName } from "./objects.js";
import { lastName } from "./objects.js";
import { email } from "./objects.js";
import { phone } from "./objects.js";
import { product } from "./objects.js";
import { support } from "./objects.js";
import { contact } from "./objects.js";
import { message } from "./objects.js";
import { fileUpload } from "./objects.js";
import { submitButton } from "./objects.js";
import { privacyPolicy } from "./objects.js";
import { successMessage } from "./objects.js";
import { errorMessage } from "./objects.js";

Cypress.Commands.add("accessPage", (visit, validateTitle) => {
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

Cypress.Commands.add("clickElement", (selector) => {
  cy.get(selector).click();
});

Cypress.Commands.add("validateFormTitle", () => {
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
  cy.contains(email.labelSelector, email.labelContains).should("be.visible");

  cy.validateRequiredMark(email.requiredSelector, email.requiredContains, true);

  cy.get(email.inputSelector);
});

Cypress.Commands.add("validatePhone", (visible) => {
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
  cy.contains(product.labelSelector, product.labelContains).should(
    "be.visible"
  );

  cy.wrap(product.optionSelectorList).each((option, index) => {
    const $option = Cypress.$(option);
    expect($option.attr("value")).to.equal(product.optionValueList[index]);
    expect($option.text().trim()).to.equal(product.optionContentList[index]);
  });
});

Cypress.Commands.add("selectProduct", (value) => {
  if (!typeof value === "number") {
    throw new Error("Informar o índice da opção");
  }

  cy.get(product.selectSelector).select(product.optionValueList[value]);
});

Cypress.Commands.add("validateSelectedProduct", (index) => {
  cy.get(product.optionSelectorSelected)
    .should("have.value", product.optionValueList[index])
    .then(($option) => {
      expect($option.text().trim()).to.equal(product.optionContentList[index]);
    });
});

Cypress.Commands.add("validateSupport", () => {
  cy.contains(support.divSelector, support.divContains).should("be.visible");

  cy.get(support.inputSelector).each(($label, index) => {
    expect($label.text().trim()).to.equal(support.inputContentList[index]);
    cy.wrap($label.find("input")).should(
      "have.attr",
      "value",
      support.inputValueList[index]
    );
  });
});

Cypress.Commands.add("selectSupport", (value) => {
  if (!typeof value === "number") {
    throw new Error("Informar o índice da opção");
  }
  cy.get(support.inputSelector).then(($label) => {
    cy.wrap($label.find("input")).check(support.inputValueList[value]);
  });
});

Cypress.Commands.add("validateCheckedSupport", (index) => {
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
  cy.contains(contact.divSelector, contact.divContains).should("be.visible");

  cy.get(contact.inputSelectorList).each((input, index) => {
    cy.get(input).then(($input) => {
      expect($input.attr("value")).to.equal(contact.inputValueList[index]);
    });
  });

  cy.get(contact.labelSelectorList).each((label, index) => {
    const $label = Cypress.$(label);

    expect($label.text().trim()).to.equal(contact.labelContentList[index]);
  });
});

Cypress.Commands.add("selectContact", (value, uncheck) => {
  if (!typeof value === "number") {
    if (!typeof value === "text" && !value.toUpperCase() === "ALL") {
      throw new Error("Informar o índice da opção ou all para todos");
    }
  }

  if (!typeof uncheck === "boolean") {
    throw new Error("Informar false para marcar ou true para desmarcar");
  }

  cy.get(contact.inputSelector).each((inputs, index) => {
    const $input = Cypress.$(inputs);
    var checkitem = false;

    if ($input.is(":checked") && uncheck) {
      checkitem = true;
    }

    if (!$input.is(":checked") && !uncheck) {
      checkitem = true;
    }
    if (checkitem && (value.toUpperCase() === "ALL" || value === index)) {
      cy.wrap($input).check(contact.inputValueList[index]);
    }
  });
});

Cypress.Commands.add("validateMessage", () => {
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
  cy.contains(fileUpload.labelSelector, fileUpload.labelContains).should(
    "be.visible"
  );
  cy.get(fileUpload.inputSelector);
});

Cypress.Commands.add("validateSubmitButton", () => {
  cy.contains(submitButton.buttonSelector, submitButton.buttonContains).should(
    "be.visible"
  );
});

Cypress.Commands.add("validateprivacyPolicy", () => {
  cy.contains(privacyPolicy.linkSelector, privacyPolicy.linkContains).should(
    "be.visible"
  );
});

Cypress.Commands.add("validateSuccessMessage", () => {
  cy.contains(successMessage.spanSelector, successMessage.spanContains).should(
    "be.visible"
  );
});

Cypress.Commands.add("validateErrorMessage", () => {
  cy.contains(errorMessage.spanSelector, errorMessage.spanContains).should(
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
  (
    firstNameField,
    lastNameField,
    emailField,
    productSelection,
    supportSelection,
    choosingContacts,
    phoneField,
    messageField,
    submitForm
  ) => {
    if (
      firstNameField !== null &&
      firstNameField.name == "firstName" &&
      firstNameField.content !== false
    ) {
      cy.setFieldValue(
        firstName.inputSelector,
        firstNameField.content,
        firstNameField.clearField
      );
    }

    if (
      lastNameField !== null &&
      lastNameField.name == "lastName" &&
      lastNameField.content !== false
    ) {
      cy.setFieldValue(
        lastName.inputSelector,
        lastNameField.content,
        lastNameField.clearField
      );
    }

    if (
      emailField !== null &&
      emailField.name == "email" &&
      emailField.content !== false
    ) {
      cy.setFieldValue(
        email.inputSelector,
        emailField.content,
        emailField.clearField
      );
    }
    if (
      productSelection !== null &&
      productSelection.name == "product" &&
      productSelection.content !== false
    ) {
      cy.selectProduct(productSelection.content);
    }

    if (
      supportSelection !== null &&
      supportSelection.name == "support" &&
      supportSelection.content !== false
    ) {
      cy.selectSupport(supportSelection.content);
    }

    if (choosingContacts !== null && choosingContacts.name == "contact") {
      cy.selectContact(choosingContacts.content, choosingContacts.uncheck);
    }

    if (
      phoneField !== null &&
      phoneField.name == "phone" &&
      phoneField.content !== false
    ) {
      cy.setFieldValue(
        phone.inputSelector,
        phoneField.content,
        phoneField.clearField
      );
    }

    if (
      messageField !== null &&
      messageField.name == "message" &&
      messageField.content !== false
    ) {
      cy.setFieldValue(
        message.textareaSelector,
        messageField.content,
        messageField.clearField
      );
    }

    if (submitForm) {
      cy.clickElement(submitButton.buttonSelector);
    }
  }
);

Cypress.Commands.add(
  "submitFormOld",
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
