declare namespace NodeJS {
    interface ProcessEnv {
        SERVER_PORT: number;
        SERVER_PROTOCOL: string;
        SERVER_HOST: string;
    }
}