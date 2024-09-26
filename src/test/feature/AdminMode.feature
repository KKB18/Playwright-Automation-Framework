@f2
Feature: Admin mode

    Background: 
        Given user navigates to the application
        Then assert that " Log in using your MCP credentials. " message is displayed on the Login Screen
        When user enters "MCValidation" into UserName
            And user enters "AMCtest12#$" into Password
            And user clicks on "Log In" button
        Then assert that "Home Dashboard" text is displayed
    @a
    Scenario: Navigate to Admin mode
        When user clicks on "User Profile" title
            And user clicks on "Switch to MCP Web Admin" title
        Then assert that "Announcements Admin" text is displayed