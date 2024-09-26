import * as dotenv from "dotenv"

export const getEnv = () => {
    dotenv.config({
        override: true,
        path: "./src/test/helper/env/.env.preProd"
    })
}