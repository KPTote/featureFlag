import 'dotenv/config';
import { get } from 'env-var';

export const envs = {

    PORT: get('PORT').required().asPortNumber(),
    JWT_SEED: get('JWT_SEED').required().asString(),
    JWT_TIME: get('JWT_TIME').required().asString(),
    USER_INIT: get('USER_INIT').required().asString(),
    USER_INIT_PASS: get('USER_INIT_PASS').required().asString()

};