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
        When user enters "" into "Clear the text" text box
        Then user asserts that "Confirm edit field is disabled" field is disabled
        Then user asserts that "Confirm text is readonly" field is readonly
    
    @l2
    Scenario: Play with File Management
        When user clicks on "File management" link text
        Then assert that "Upload and Download" text is visible
        When user downloads by clicking on "Download Pdf"

    @l3
    Scenario: Play with Buttons
        When user clicks on "Click" link text
        Then assert that "Button" text is visible
        When user clicks on button "Goto Home"
        Given user navigates to the Let Code - Practice and become pro in test automation
        When user clicks on "Click" link text
        Then assert that "Button" text is visible
        When user gets x y coordinates of "Find Location" button
        Then user gets the css properties of button "What is my color?"
        Then user asserts that button "Disabled" is disabled
        When user clicks and hold "Button Hold!" button for 3 seconds

    @l4
    Scenario: Play with DropDowns
        When user clicks on "Drop-Down" link text
        Then assert that "Dropdown" text is visible
        When user selects "Mango" value from the dropdown "Select the apple using visible text"
        Then assert that "You have selected Mango" text is visible
        When user selects "Wonder Woman, Robin" values from the dropdown "Select your super hero's"
        Then assert that "You have selected Robin" text is visible
        When user selects "C#" values from the dropdown "Select the last programming language and print all the options"
        When user gets the length of options and prints all of them from the dropdown "Select the last programming language and print all the options"
        When user selects "Venezuela" values from the dropdown "Select India using value & print the selected value"
        When user gets the length of options and prints all of them from the dropdown "Select India using value & print the selected value"