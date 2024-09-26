export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER: "chrome" | "firefox" | "webkit",
            ENV: "Env1" | "Env2" | "Env3",
            BASEURL: string,
            HEAD: "headed" | "headless"
        }
    }
}