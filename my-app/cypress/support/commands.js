/// <reference types="cypress" />
import "@applitools/eyes-cypress/commands";
import "@percy/cypress";

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.get('input[placeholder="電子信箱"]').type(email);
  cy.get('input[placeholder="密碼"]').type(password);
  cy.get(".submit-btn").click();
});

// applitools初始化及關閉
Cypress.Commands.add("initializeVisualTools", () => {
  if (Cypress.env("USE_APPLITOOLS")) {
    cy.eyesOpen({
      appName: "My App",
      testName: Cypress.currentTest.title,
    });
  } else {
    cy.log("Applitools is disabled for this test.");
  }
});

Cypress.Commands.add("finalizeVisualTools", () => {
  if (Cypress.env("USE_APPLITOOLS")) {
    cy.eyesClose();
  } else {
    cy.log("Applitools closing skipped.");
  }
});

// How to use
// describe('Visual Testing with Unified Tools', () => {
//   beforeEach(() => {
//     cy.initializeVisualTools();
//   });

//   afterEach(() => {
//     cy.finalizeVisualTools();
//   });

//   it('should perform visual checks', () => {
//     cy.visit('/');
//     cy.eyesCheckWindow('Homepage');  // Applitools 視覺檢查
//     cy.percySnapshot('Homepage');   // Percy 視覺檢查
//   });
// });
Cypress.Commands.add("performVisualCheck", (tool, checkName) => {
  // 獲取環境變數並設置默認值
  const useApplitools = Cypress.env("USE_APPLITOOLS") ?? false; // 默認為 false
  const usePercy = Cypress.env("USE_PERCY") ?? false; // 默認為 false

  if (tool === "applitools" && useApplitools) {
    cy.eyesCheckWindow(checkName);
  } else if (tool === "percy" && usePercy) {
    cy.percySnapshot(checkName);
  } else {
    cy.log(`${tool} visual testing is disabled.`);
  }
});
// How to use
// cy.performVisualCheck("applitools", "Homepage"); // 使用 Applitools
// cy.performVisualCheck("percy", "Homepage"); // 使用 Percy
