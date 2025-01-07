import { before } from "node:test"

describe('Quiz', () => {
    before(() => {
        cy.visit('http://localhost:3000');
            });
        });
    it('should render correctly', () => {
        cy.get("button, {name: 'start'}").should('exist');
    });

    it ('should have a start button', () => {
        cy.get("button, {name: 'start'}").click();
        cy.get("h1").should('have.text', 'Question 1');
    });

    it("should fetch the quiz questions", () => {
        cy.get("button, {name: 'start'}").click();
        cy.wait(1000)
            .get("div")
            .eq(0)
            .get("h1")
            .should("have.text", "Question 1");
    });

    it("should render answer choices", () => {
        cy.get("button, {name: 'start'}").click();
        cy.wait(1000)
            .get("div")
            .eq(0)
            .get("h1")
            .should("have.text", "Question 1");
        cy.get("button").should("have.length", 4);
    });

    it("should be able to select an answer", () => {
        cy.get("button, {name: 'start'}").click();
        cy.wait(1000)
            .get("div")
            .eq(0)
            .get("h1")
            .should("have.text", "Question 1");
        cy.get("button").first().click();
        cy.get("button").first().should("have.class", "selected");
    });

    it("should move to the next question", () => {
        cy.get("button, {name: 'start'}").click();
        cy.get("button").first().click();
        cy.wait(1000)
            .get("div")
            .eq(0)
            .get("h1")
            .should("have.text", "Question 2");
    });

    it("should render the results page", () => {
        cy.get("button, {name: 'start'}").click();
        for (let i = 0; i < 4; i++) {
            cy.get("button").eq(i).click();
        }
        cy.get("button").eq(4).click();
        cy.wait(1000)
            .get("div")
            .eq(0)
            .get("h1")
            .should("have.text", "Results");
    });

    it("should render the final score", () => {
        cy.get("button, {name: 'start'}").click();
        for (let i = 0; i < 4; i++) {
            cy.get("button").eq(i).click();
        }
        cy.get("button").eq(4).click();
        cy.wait(1000)
            .get("div")
            .eq(0)
            .get("h1")
            .should("have.text", "Results");
        cy.get("h2").should("have.text", "You scored 0 out of 4");
    });

    it("should start a new quiz", () => {
        cy.get("button, {name: 'start'}").click();
        for (let i = 0; i < 4; i++) {
            cy.get("button").eq(i).click();
        }
        cy.get("button").eq(4).click();
        cy.get("button, {name: 'start'}").click();
        cy.get("h1").should("have.text", "Question 1");
    });

