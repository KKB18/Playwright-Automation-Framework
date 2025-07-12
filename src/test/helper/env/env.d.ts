export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER: "chrome" | "firefox" | "webkit",
            ENV: "letCode" | "expandTesting" | "orangeHrmLive" ,
            BASEURL: string,
            HEAD: "headed" | "headless",
            TAGS: string
        }
    }
}