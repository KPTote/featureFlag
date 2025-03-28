

import { regularExps } from "../../../configs/regular-exp";



export class DeleteUserDto {


    constructor(
        public readonly email: string
    ) { };


    static verifyEmail(email: string): [string?, DeleteUserDto?] {

        if (!email) {
            return ['Missing Email'];
        };

        if (!regularExps.email.test(email)) {
            return ['Email is not valid'];
        };

        return [undefined, new DeleteUserDto(email)];

    };


};