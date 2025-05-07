/* eslint-disable no-unused-vars */
declare namespace Express {
  export interface Request {}
}

declare namespace NodeJS {
  interface ProcessEnv {
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_PORT?: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
