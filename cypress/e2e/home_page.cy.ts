describe("Introduction to objects", () => {
	it("navigates to first lesson and receives appropriate responses for submitted code", () => {
		cy.visit("/");

		cy.contains(/introduction to objects/i).click();

		cy.url().should("include", "/javascript/objects/introduction/index");

		cy.get("h1").should("contain", "Introduction to JavaScript Objects");

		cy.get("ol > li").should("have.length.least", 1);

		cy.get("ol li > a").contains("Introduction").click();

		// enter code with missing required element
		cy.get("textarea").type("missing-element", { force: true });

		cy.get("button").contains("Check").click();

		cy.contains(/Your code is missing the following:/i).click();

		// enter code with required element that is incorrect
		cy.get("textarea").clear({ force: true }).type("const myObject", { force: true });

		cy.get("button").contains("Check").click();

		cy.contains(/The variable's name is incorrect./i).click();

		// show/get example answer
		cy.get("button").contains("Get example answer").click();

		cy.contains(/const emptyObject = {};./i).click();

		// enter correct code
		cy.get("textarea").clear({ force: true }).type("const emptyObject = {}", { force: true });

		cy.get("button").contains("Check").click();

		cy.contains(/Correct./i).click();
	});
});

export {};
