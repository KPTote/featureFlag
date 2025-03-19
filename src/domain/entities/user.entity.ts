import { User } from "../../interfaces/user.interface";
import { CustomError } from "../errors/custom.error";

export class UserEntity{

    constructor(
        public userProps: User
    ){};

    static fromObject( props: User ){
        const {firstName, lastName, password, email, typeUser } = props;


        if(!firstName){
            throw CustomError.badRequest('Missing Name');
        }

        if(!lastName){
            throw CustomError.badRequest('Missing Last name');
        }

        if(!password){
            throw CustomError.badRequest('Missing Password');
        }

        if(!email){
            throw CustomError.badRequest('Missing Password');
        }

        if(!typeUser){
            throw CustomError.badRequest('Missing Type User');
        }

        return new UserEntity(props);

    };

};