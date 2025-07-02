@f3 @apiSmoke
Feature: Practice API
Testing openVerse api

    @a1 @api
    Scenario: Basic Authentication   
        Given user generates OAuth Token
            And user generates access token
        When user makes a get request to "audio" endpoint with "9da64ef3-0449-4935-a79f-97b7008d1cff"
        Then user should see the response with status code 200
            And user assert that response body contains "title" as "To The Moon"
            And user assert that response body contains "creator" as "Ton in Ton"
            And user assert that response body contains "genres" as "chillout,downtempo,electronic"
            And user assert that response body contains "tags[5].name" as "synthi"
