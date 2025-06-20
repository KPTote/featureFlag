import { regularExps } from "../../../configs/regular-exp";
import { ENUM_TYPE_USER, Profile } from "../../../enums";
import { User } from "../../../interfaces/user.interface";



export class UserDto {


    constructor(
        public readonly userProps: User
    ) { };


    static create(props: User): [string?, User?] {

        const { firstName, lastName, email, password, typeUser, profile } = props

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

        if (!profile && typeUser !== ENUM_TYPE_USER.USER_MAIN) {
            return ['Missing profile'];
        };

        if (profile && ![Profile.BANPAIS, Profile.BISV, Profile.BIPA].some(prof => prof === profile)) {
            return ['Profile incorrect'];
        };

        if (typeUser && ![ENUM_TYPE_USER.ADMIN, ENUM_TYPE_USER.USER_MAIN, ENUM_TYPE_USER.TESTER].some(type => type === typeUser.toUpperCase())) {
            return ['Type user incorrect'];
        };


        props.typeUser = typeUser.toUpperCase() as ENUM_TYPE_USER;
        const user = new UserDto(props);

        return [undefined, user.userProps];

    };


};