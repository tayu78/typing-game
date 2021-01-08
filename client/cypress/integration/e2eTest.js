describe("e2e", () => {
  it("game start and  game clear", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get("body").trigger("keypress", { key: " " });
    cy.wait(2000);
    for (let i = 1; i < 11; i++) {
      cy.get("#symbol")
        .invoke("text")
        .then((text1) => {
          cy.get("body").trigger("keypress", { key: text1 });
        });
      cy.wait(2000);
    }
  });
});
