/**
 * this test will perform the login and disconnect
 */
describe("Alarmes crud", () => {
  it("should navigate to the login", () => {
    cy.visit(`http://localhost:8888/auth/signin/`, {
      onBeforeLoad(win) {
        win.indexedDB.deleteDatabase("renderer/model/db/index.ts");
      },
    });
    cy.screenshot();
  });
  it("should not login with empty data", () => {
    cy.visit(`http://localhost:8888/auth/signin/`);
    cy.get("form > .MuiButtonBase-root").click();
    cy.screenshot();
  });
  it("should not login with wrong data", () => {
    cy.visit(`http://localhost:8888/auth/signin/`);
    cy.get("#username").type("admin");
    cy.get("#password").type("admin2");
    cy.get("form > .MuiButtonBase-root").click();
    cy.screenshot();
  });
  it("should login", () => {
    cy.visit(`http://localhost:8888/auth/signin/`);
    cy.get("#username").type("admin");
    cy.get("#password").type("admin");
    cy.get("form > .MuiButtonBase-root").click();
    cy.screenshot();
  });
  it("should disconnect", () => {
    cy.visit(`http://localhost:8888/auth/signin/`);
    cy.get("#username").type("admin");
    cy.get("#password").type("admin");
    cy.get("form > .MuiButtonBase-root").click();
    cy.screenshot();
    cy.get("#disconnect").click();
  });
});
