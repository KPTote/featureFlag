import { regularExps } from "../../../configs/regular-exp";
import { ENUM_TYPE_USER } from "../../../enums";
import { User } from "../../../interfaces/user.interface";



export class RegisterUserDto {


    constructor(
        public readonly userProps: User
    ) { };


    static create(props: User): [string?, RegisterUserDto?] {

        const { firstName, lastName, email, password, typeUser } = props

        if (!firstName) {
            return ['Missing Name'];
        };

        if (!lastName) {
            return ['Missing Last name'];
        };

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

        if (!typeUser) {
            return ['Missing type user'];
        };

        if (typeUser && ![ENUM_TYPE_USER.ADMIN, ENUM_TYPE_USER.USER_MAIN, ENUM_TYPE_USER.TESTER].some(type => type === typeUser)) {
            return ['Type user incorrect'];
        };

        return [undefined, new RegisterUserDto(props)];

    };


};