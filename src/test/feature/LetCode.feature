@f2
Feature: Practice and become pro in test automation

    Background:
        Given user navigates to the Let Code - Practice and become pro in test automation

    @l1
    Scenario: Play with Input Elements
        When user clicks on "Edit" link text
        Then assert that "Input" text is visible
        When user enters "Test Automation User" into "Enter your full Name" text box
        When user appends " Tester" into "Append a text and press keyboard tab" text box
        Then user asserts that "What is inside the text box" field is equal to "ortonikc" text
        When user enters "Clear the text" into "" text box
        Then user asserts that "Confirm edit field is disabled" field is disabled
        Then user asserts that "Confirm text is readonly" field is readonly
    
    @l2
    Scenario: Play with File Management
        When user clicks on "File management" link text
        Then assert that "Upload and Download" text is visible
        When user downloads by clicking on "Download Pdf"