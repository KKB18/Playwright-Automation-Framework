import * as pact from "pactum";
import { faker } from '@faker-js/faker';
import path from "path";

let client_id: string = '';
let client_secret: string = '';
let access_token: string = '';
const randomName = faker.person.fullName();
const randomDescription = faker.lorem.sentence();
const randomEmail = faker.internet.email();
pact.request.setBaseUrl('https://api.openverse.org/v1');
pact.request.setDefaultTimeout(30000);

export const oAuthToken = async () => {
    const response = await pact.spec()
        .post('/auth_tokens/register/')
        .withHeaders('Content-Type', 'application/json')
        .withBody({
            "name": randomName,
            "description": randomDescription,
            "email": randomEmail
        })
        .expectStatus(201)
        .returns('client_id')
        .returns('client_secret')
        .toss();
    client_id = response[0];
    client_secret = response[1];
    console.log("Client ID: ", client_id);
    console.log("Client Secret: ", client_secret);
};

export const accessToken = async () => {
    const response = await pact.spec()
        .post('/auth_tokens/token/')
        .withHeaders('Content-Type', 'application/x-www-form-urlencoded')
        .withForm({
            grant_type: "client_credentials",
            client_id: client_id,
            client_secret: client_secret
        })
        .expectStatus(200)
        .returns('access_token')
        .toss();
    access_token = response;
    console.log("Access Token: ", access_token);
};

export const apiRequest = async () => {
    let response = pact.spec()
        .get('/audio/')
        .withBearerToken(access_token)
        .expectStatus(200)
        .returns('url')
        .toss();
    console.log("Audio URL: ", response);
};