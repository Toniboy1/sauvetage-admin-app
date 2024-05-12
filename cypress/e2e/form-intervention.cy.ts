describe("Navigation", () => {
  it("should navigate to the page to create forms", () => {
    cy.visit(`http://localhost:8888/forms_interventions/`);
  });
  it("should navigate to the page actions", () => {
    cy.visit(`http://localhost:8888/actions/`);
  });
  it("should navigate to the page alarmes", () => {
    cy.visit(`http://localhost:8888/alarmes/`);
  });
  it("should navigate to the page interventions", () => {
    cy.visit(`http://localhost:8888/interventions/`);
  });
  it("should navigate to the page causes", () => {
    cy.visit(`http://localhost:8888/causes/`);
  });
  it("should navigate to the page common locations", () => {
    cy.visit(`http://localhost:8888/common_locations/`);
  });
  it("should navigate to the page other_means", () => {
    cy.visit(`http://localhost:8888/other_means/`);
  });
  it("should navigate to the page people", () => {
    cy.visit(`http://localhost:8888/people/`);
  }),
    it("should navigate to the page severities", () => {
      cy.visit(`http://localhost:8888/severities/`);
    });
});
