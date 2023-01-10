declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: string;
            TOKEN_SECRET: string;
            DB_NAME: string;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_PORT?: string;
        }
    }
}

export {};
