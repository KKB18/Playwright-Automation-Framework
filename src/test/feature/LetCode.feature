@f2
Feature: Practice and become pro in test automation

    Background:
        Given user navigates to the Let Code - Practice and become pro in test automation

    Scenario: Play with Input Elements
        When user clicks on "Edit" link text
        Then assert that "Input" text is visible
        When user enters "Test Automation User" into "Enter your full Name" text box