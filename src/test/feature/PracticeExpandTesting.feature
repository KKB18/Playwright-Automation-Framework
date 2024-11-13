@f3
Feature: Practice Test Automation Website for Web UI & API

    Background:
        Given user navigates to the Practice texting website
        Then assert that the "Practice Test Automation Website for Web UI & API" text is visible

    @p1
    Scenario: Basic Authentication   
        Given user sets the authentication username as "admin" and password as "admin"
        When user clicks on the "Basic Authentication (user and pass: admin)" link text
        Then assert that the "Congratulations! You must have the proper credentials." text is visible