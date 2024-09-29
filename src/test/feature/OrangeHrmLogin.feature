@f1
Feature: User Login

    Background:
        Given user navigates to the Orange Hrm application login page
        Then assert that "Login" text is displayed
        When user enters "Admin" into "Username" field
            And user enters "admin123" into "Password" field
            When user clicks on " Login " button
        Then assert that "Login" text is not displayed

    @Smoke
    Scenario: Navigate to User settings
        When user "expands" the side menu
            And user clicks on "Admin" text
            And user "collapses" the side menu
        Then assert that "System Users" text is displayed
        When user enters "kitty_k" into "Username" field
            And user selects "ESS" from "User Role" dropdown
            # And user enters "kitty k samuel" into "Employee Name" field
            And user selects "Enabled" from "Status" dropdown
            When user clicks on " Search " button
        Then assert that "(1) Record Found" text is displayed
        When user clicks on user dropdown icon
            And user clicks on "Logout" text
        Then assert that "Login" text is displayed
