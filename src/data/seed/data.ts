import { EncryptPassUser, envs } from "../../configs";
import { ENUM_TYPE_USER } from "../../enums";


export const userInitData = 
{
    firstName: envs.USER_INIT,
    lastName: envs.USER_INIT,
    email: `${envs.USER_INIT}@bytesw.com`,
    password: EncryptPassUser.hash(envs.USER_INIT_PASS),
    typeUser: ENUM_TYPE_USER.USER_INIT,
}