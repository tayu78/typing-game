describe("e2e", () => {
  it("game start and  game clear and go back title button works in Result", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get("body").trigger("keypress", { key: " " });
    cy.contains("表示された数字または記号のキーを押してください");
    cy.wait(2000);
    for (let i = 1; i < 11; i++) {
      cy.get("#symbol")
        .invoke("text")
        .then((text1) => {
          cy.get("body").trigger("keypress", { key: text1 });
        });
      cy.wait(2000);
    }
    cy.contains("結果");
    cy.contains("タイトルに戻る").click();
    cy.contains("タイピング練習ゲーム");
  });

  it("go back title button works in Content", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get("body").trigger("keypress", { key: " " });
    cy.contains("タイトルに戻る").click();
    cy.contains("タイピング練習ゲーム");
  });
});
