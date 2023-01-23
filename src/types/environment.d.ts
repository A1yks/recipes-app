declare global {
    declare namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_URL: string;
            NEXT_PUBLIC_API_URL: string;
        }
    }
}

export {};
