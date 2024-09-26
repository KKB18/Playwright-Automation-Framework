@f1
Feature: User Login

    Background: 
        Given user navigates to the application
        Then assert that " Log in using your MCP credentials. " message is displayed on the Login Screen
        When user enters "MCAdmin" into UserName
            And user enters "MCAdmin" into Password
            And user clicks on "Log In" button
        Then assert that "Home Dashboard" text is displayed
    @Smoke
    Scenario: Navigate to User settings
        When user clicks on "User Profile" title
            And user clicks on "User Settings" title
        Then assert that "My Profile" text is displayed
            And assert that "Password / Security" text is displayed
        When user clicks on "Close" title
    @kq
    Scenario: About MCP Section
        When user clicks on "User Profile" title
            And user clicks on "About MCP" title
        Then assert that "Core Configuration Version:" text is displayed
            And assert that "4.0.0.72" text is displayed
         When user clicks on "Close" title

    @k
    Scenario: pdf download
        When user opens the loan "5000059585"
        Then assert that "Current Loan:" text is displayed
        When user clicks on "Documents" title
        When user clicks on "Document Tracking" title
        Then assert that "Document Filters" text is displayed
        When user clicks on checkbox for the the document "Early Check Review"
        When user opens the document in document viewer
