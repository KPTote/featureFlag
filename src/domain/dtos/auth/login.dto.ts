import { regularExps } from "../../../configs/regular-exp";


export class LoginUserDto {

    constructor(
        public readonly email: string,
        public readonly password: string
    ) { };

    static login(email: string, password: string): [string?, LoginUserDto?] {

        if (!email) {
            return ['Missing Email'];
        };

        if (!regularExps.email.test(email)) {
            return ['Email is not valid'];
        };

        if (!password) {
            return ['Missing password'];
        };

        if (password.length < 6) {
            return ['Password too short'];
        };

        return [undefined, new LoginUserDto(email, password)]
    };

};