@f1
Feature: User Login

    Background:
        Given user navigates to the Orange Hrm application login page
        Then assert that "Login" text is displayed
        When user enters "Admin" into "Username" field
            And user enters "admin123" into "Password" field
        When user clicks on "Login" button
        Then assert that "Login" text is not displayed
    @a
    Scenario: temp
        When user "expands" the side menu
            And user clicks on "Admin" text
            And user "collapses" the side menu
        Then assert that "System Users" text is displayed
            # When user selects "Engineering" from "Sub Unit" dropdown
            #     And user clicks on "Search" button
            # Then assert that " (4) Records Found" text is displayed
            # And user enters "admin123" into "Candidate Name" field
            # And user enters "2012-11-12" into "To" placeholder
            # | CheckBox   | Id   | First Name | Last Name | Job Title         | Employment Status   | Sub Unit          | Supervisor | Actions    |
            # | <<ignore>> | 0034 | Russel     | Hamilton  | Software Engineer | Full-Time Permanent | Development       | <<ignore>> | <<ignore>> |
            # | <<ignore>> | 0042 | Rebecca    | Harmony   | QA Engineer       | Full-Time Contract  | Quality Assurance | <<ignore>> | <<ignore>> |

        Then assert that below table is displayed
            | CheckBox   | Username    | User Role | Employee Name | Status  | Actions    |
            | <<ignore>> | Admin       | Admin     | Rohini user   | Enabled | <<ignore>> |
            | <<ignore>> | JohnDoeDoe  | ESS       | John Doe      | Enabled | <<ignore>> |
            | <<ignore>> | bilalkhan   | ESS       | bilal bukhari | Enabled | <<ignore>> |
            | <<ignore>> | hibabukhari | ESS       | hiba bukhari  | Enabled | <<ignore>> |

    @Emp
    Scenario: Create and search new Employee in PIM module
        When user "expands" the side menu
            And user clicks on "PIM" text
            And user "collapses" the side menu
        Then assert that "Employee Information" text is displayed
        When user clicks on "Add" button
        Then assert that "Add Employee" text is displayed
        When user uploads "image1.jpg" file
            And user enters "Test" into "First Name" placeholder
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
        When user closes the notification banner
        Then assert that "Personal Details" text is displayed
        When user enters "DL123456" into "Driver's License Number" field
            And user selects "2010-10-11" date from "License Expiry Date" field
            And user selects "Indian" from "Nationality" dropdown
            And user selects "Single" from "Marital Status" dropdown
            And user selects "1990-28-3" date from "License Expiry Date" field
            And user clicks on "Male" for "Gender" radio button
            And user selects "A+" from "Blood Type" dropdown
            And user clicks on "Save" button
        Then assert that "Success" status banner with "Successfully Saved" message is displayed
        When user closes the notification banner
            And user clicks on "Add" button
            And user uploads "AddressProof.docx" file
            And user enters "Address proof uploaded" into "Type comment here" textarea
            And user clicks on "Save" button
        Then assert that "Success" status banner with "Successfully Saved" message is displayed
        When user closes the notification banner
        Then wait for the spinner to close
            And assert that below table is displayed
                | CheckBox   | File Name         | Description            | Size          | Type          | Date Added | Actions |
                | <<ignore>> | AddressProof.docx | Address proof uploaded | <<not-empty>> | <<not-empty>> | 2024-10-10 | Admin   |
        When user "expands" the side menu
            And user clicks on "PIM" text
            And user "collapses" the side menu
        Then assert that "Employee Information" text is displayed
        When user enters "Test Automation User" into "Employee Name" field
            And user clicks on "Search" button
        Then assert that " (1) Record Found" text is displayed
            And assert that below table is displayed
                | CheckBox   | Id        | First Name      | Last Name | Job Title | Employment Status | Sub Unit | Supervisor | Actions    |
                | <<ignore>> | 123456789 | Test Automation | User      |           |                   |          | <<ignore>> | <<ignore>> |


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
