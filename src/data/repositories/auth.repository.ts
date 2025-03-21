import { User } from "../../interfaces/user.interface";
import { prisma } from "../postgres";


export class AuthRepository {


    static async create(userProps: User){

        console.log(userProps);


       return await prisma.fT_USER.create({ data: {
        USER_FIRSTNAME: userProps.firstName ?? '',
        USER_LASTNAME: userProps.lastName ?? '',
        USER_PASSWORD: userProps.password ?? '',
        USER_EMAIL: userProps.email ?? '',
        USER_TYPE_USER: userProps.typeUser ?? '',
       } });

    };

    static async findEmail(email: string){
        return await prisma.fT_USER.findFirst({
            where: {
                USER_EMAIL: email
            }
        });
    };

};