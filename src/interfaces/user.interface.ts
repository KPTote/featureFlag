import { ENUM_TYPE_USER } from "../enums/type-user.enum";

export interface User {
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    typeUser: ENUM_TYPE_USER,
    adminId?: number;
};


