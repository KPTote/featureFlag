import { ENUM_TYPE_USER } from "../../../enums";



export class TypeUserVerificationService {

    public verify(user: string): boolean{

        const users: string[] = [
            ENUM_TYPE_USER.ADMIN,
            ENUM_TYPE_USER.TESTER,
            ENUM_TYPE_USER.USER_MAIN,
        ];

        return users.includes(user)

    };

};