import 'dotenv/config';
import { get } from 'env-var';

export const envs = {

    PORT: get('PORT').required().asPortNumber(),
    JWT_SEED: get('JWT_SEED').required().asString(),
    JWT_TIME: get('JWT_TIME').required().asString(),
    USER_INIT: get('USER_INIT').required().asString(),
    USER_INIT_PASS: get('USER_INIT_PASS').required().asString(),
    GOOGLE_CONFIG: get('GOOGLE_APPLICATION_CREDENTIALS').required(),

    //Mongo DB

    MONGO_URL: get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
    MONGO_USER: get('MONGO_USER').required().asString(),
    MONGO_PASS: get('MONGO_PASS').required().asString(),

    FIREBASE_PROJECT_ID: get('FIREBASE_PROJECT_ID').required().asString(),
    FIREBASE_CLIENT_EMAIL: get('FIREBASE_CLIENT_EMAIL').required().asString(),
    FIREBASE_PRIVATE_KEY: get('FIREBASE_PRIVATE_KEY').required().asString()

};