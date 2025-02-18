declare namespace NodeJS {
    interface ProcessEnv {
        SERVER_PORT: number;
        SERVER_PROTOCOL: string;
        SERVER_HOST: string;
        POSTGRES_USER: string;
        POSTGRES_PASSWORD: string;
        POSTGRES_HOST: string;
        POSTGRES_PORT: number;
        POSTGRES_DB: string;
    }
}