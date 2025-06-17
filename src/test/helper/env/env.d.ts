export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER: "chrome" | "firefox" | "webkit",
            ENV: "preProd" | "qa" | "prod",
            BASEURL: string,
            HEAD: "headed" | "headless",
            TAGS: string
        }
    }
}