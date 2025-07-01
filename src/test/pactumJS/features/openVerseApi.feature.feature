@f3 @apiSmoke
Feature: Practice API
Testing openVerse api

    @a1 @api
    Scenario: Basic Authentication   
        Given user generates OAuth Token
        Given user generates access token
        Given user makes a get request to audio