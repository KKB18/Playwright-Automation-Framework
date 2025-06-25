@f3
Feature: Practice Test Automation Website for Web UI & API

    Background:
        Given user navigates to the Practice texting website
        Then assert that the "Sample applications for practice test automation" text is visible

    @p1
    Scenario: Basic Authentication   
        When user clicks on the "Basic Authentication (user and pass: admin)" link text
        Then assert that the "Congratulations! You must have the proper credentials." text is visible