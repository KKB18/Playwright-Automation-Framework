import * as pact from "pactum";
export let responseStatus: number;
export let responseBody: any;

export const setPactumGraphqlUrl = async (url: string) => {
    pact.request.setBaseUrl(url);
};
export const setPactumGraphqlRequestTimeout = async (timeout: number) => {
    pact.request.setDefaultTimeout(timeout);
};

export const graphqlRequest = async (filePath: string) => {
    const payLoadfile = require(`../graphqlPayloadAndRespnse/${filePath}`);
    const payload = payLoadfile.payload;
    // console.log(payLoadfile, payload);
    const res = await pact.spec()
        .post('/graphql')
        .withGraphQLQuery(payload.query)
        .withGraphQLVariables(payload.variables)
        .withHeaders('Content-Type', 'application/json')
        .expectStatus(200)
        .toss();
    responseStatus = res.statusCode; // Store the status code
    responseBody = res.text
    console.log(`Status Code: ${responseStatus}`);
    console.log(`Response: ${res.text}`);
};

// Add method to get the status code
export const getResponseStatus = (): number => {
    return responseStatus;
};

export const graphqlResponseMatchesSnapshot = async (filePath: string) => {
    const expectedResponse = require(`../graphqlPayloadAndRespnse/${filePath}`);
    if (JSON.stringify(responseBody) !== JSON.stringify(expectedResponse.response)) {
        throw new Error(`Response does not match snapshot: ${filePath}`);
    }
};