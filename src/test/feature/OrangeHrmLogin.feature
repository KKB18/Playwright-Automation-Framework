@f1
Feature: User Login

    Background:
        Given user navigates to the Orange Hrm application login page
        Then assert that "Login" text is displayed
        When user enters "Admin" into "Username" field
            And user enters "admin123" into "Password" field
            When user clicks on "Login" button
        Then assert that "Login" text is not displayed

    @Emp
    Scenario: Create and search new Employee in PIM module
        When user "expands" the side menu
            And user clicks on "PIM" text
            And user "collapses" the side menu
        Then assert that "Employee Information" text is displayed
        When user clicks on "Add" button
        Then assert that "Add Employee" text is displayed
        When user enters "Test" into "First Name" placeholder
            And user enters "Automation" into "Middle Name" placeholder
            And user enters "User" into "Last Name" placeholder
            And user enters "123456789" into "Employee Id" field
            And user clicks on the "Create Login Details" toggle
        Then assert that "For a strong password, please use a hard to guess combination of text with upper and lower case characters, symbols and numbers" text is displayed
        When user enters "TestAutomation" into "Username" field
            When user clicks on "Enabled" for "Status" radio button
            And user enters "AMCtest12#$" into "Password" field
            And user enters "AMCtest12#$" into "Confirm Password" field
        Then assert that "Strong " text is displayed
        When user clicks on "Save" button
        Then assert that "Success" status banner with "Successfully Saved" message is displayed


    Scenario: Create and search new user in Admin module
        When user "expands" the side menu
            And user clicks on "Admin" text
            And user "collapses" the side menu
        Then assert that "System Users" text is displayed
        When user clicks on "Add" button
        Then assert that "Add User" text is displayed
        When user selects "ESS" from "User Role" dropdown
        When user enters "kitty_k" into "Username" field
            And user selects "ESS" from "User Role" dropdown
            # And user enters "kitty k samuel" into "Employee Name" field
            And user selects "Enabled" from "Status" dropdown
            When user clicks on "Search" button
        Then assert that "(1) Record Found" text is displayed
        When user clicks on user dropdown icon
            And user clicks on "Logout" text
        Then assert that "Login" text is displayed
