import { regularExps } from "../../../configs/regular-exp";



export class ChangePassDto {


    constructor(
        public readonly email: string,
        public readonly newPass: string,
    ) { };


    static dataValidate(email: string, newPass: string): [string?, ChangePassDto?] {

        if (!email) {
            return ['Missing Email'];
        };

        if (!regularExps.email.test(email)) {
            return ['Email is not valid'];
        };

        if (!newPass) {
            return ['Missing password'];
        };

        if (newPass.length < 6) {
            return ['Password too short'];
        };

        const changePassDto = new ChangePassDto(email, newPass);

        return [undefined, changePassDto];

    };


};