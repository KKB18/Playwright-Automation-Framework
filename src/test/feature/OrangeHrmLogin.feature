@f1
Feature: User Login

    Background:
        Given user navigates to the Orange Hrm application login page
        Then assert that "Login" text is displayed
        When user enters "Admin" into "Username" field
            And user enters "admin123" into "Password" field
            And user press "Enter" key on active field
        Then assert that "Login" text is not displayed

    @Smoke
    Scenario: Navigate to User settings
        When user "expands" the side menu
            And user clicks on "Dashboard" text
            And user "collapses" the side menu
        Then assert that "Buzz" text is not displayed
        When user "expands" the side menu
            And user "expands" the side menu
        Then assert that "Buzz" text is displayed
            And user clicks on user dropdown icon
            And user clicks on "Logout" text
        Then assert that "Login" text is displayed
