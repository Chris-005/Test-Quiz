import React from 'react';
import Quiz from '../../../src/components/Quiz';

describe('Quiz', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<Quiz />);
        expect(wrapper).toMatchSnapshot();
    });
});

if ("should have a start button", () => {
    cy.mount(<Quiz />);
    cy.get('button').click();
    cy.wait(1000)
        .get("div")
        .eq(0)
        .get("h1")
        .should("have.text", "Question 1");
});

it("should have a next button", () => {
    cy.mount(<Quiz />);
    cy.get('button').click();
    cy.get('button').click();
    cy.wait(1000)
        .get("div")
        .eq(0)
        .get("h1")
        .should("have.text", "Question 2");
});

it("should have a previous button", () => {
    cy.mount(<Quiz />);
    cy.get('button').click();
    cy.get('button').click();
    cy.get('button').click();
    cy.wait(1000)
        .get("div")
        .eq(0)
        .get("h1")
        .should("have.text", "Question 3");
    cy.get('button').click();
    cy.wait(1000)
        .get("div")
        .eq(0)
        .get("h1")
        .should("have.text", "Question 2");
});

it("should have a submit button", () => {
    cy.mount(<Quiz />);
    cy.get('button').click();
    cy.get('button').click();
    cy.get('button').click();
    cy.get('button').click();
    cy.wait(1000)
        .get("div")
        .eq(0)
        .get("h1")
        .should("have.text", "Question 4");
    cy.get('button').click();
    cy.wait(1000)
        .get("div")
        .eq(0)
        .get("h1")
        .should("have.text", "Results");
});

it("should have a restart button", () => {
    cy.mount(<Quiz />);
    cy.get('button').click();
    cy.get('button').click();
    cy.get('button').click();
    cy.get('button').click();
    cy.get('button').click();
    cy.wait(1000)
        .get("div")
        .eq(0)
        .get("h1")
        .should("have.text", "Results");
    cy.get('button').click();
    cy.wait(1000)
        .get("div")
        .eq(0)
        .get("h1")
        .should("have.text", "Question 1");
});

it("should have a total of 5 questions", () => {
    cy.mount(<Quiz />);
    cy.log("intercepting fetch request");
    cy.intercept(
        {
            method: "GET",
            url: "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple",
        },
        { fixture: "quiz.json" }
    ).as(":mockedQuiz");

    cy.contains("Start").click();

    cy.wait("@mockedQuiz").then((interception) => {
        cy.log("intercepted fetch request");
        cy.get("div").should("have.length", 5);
    });

    for (let i = 0; i < 5; i++) {
        cy.get('button').click();
    }

    cy.get(".alert-success").should("have.text", "You have completed the quiz!");
});

it("should start a new quiz when the restart button is clicked", () => {
    cy.mount(<Quiz />);
    cy.log("intercepting fetch request");
    cy.intercept(
        {
            method: "GET",
            url: "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple",
        },
        { fixture: "quiz.json" }
    ).as(":mockedQuiz");

    cy.contains("Start").click();

    cy.wait("@mockedQuiz").then((interception) => {
        cy.log("intercepted fetch request");
        cy.get("div").should("have.length", 5);
    });

    for (let i = 0; i < 5; i++) {
        cy.get('button').click();
    }

    cy.get(".alert-success").should("have.text", "You have completed the quiz!");

    cy.contains("Restart").click();

    cy.wait("@mockedQuiz").then((interception) => {
        cy.log("intercepted fetch request");
        cy.get("div").should("have.length", 5);
    });
});
