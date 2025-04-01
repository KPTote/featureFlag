import { Profile } from "../../enums";
import { User } from "../../interfaces/user.interface";
import { prisma } from "../postgres";


export class AuthRepository {


    static async create(userProps: User) {

        console.log(userProps);

        if (userProps.profile) {
            userProps.profile = userProps.profile.toUpperCase() as Profile;
        };


        return await prisma.fT_USER.create({
            data: {
                USER_FIRSTNAME: userProps.firstName ?? '',
                USER_LASTNAME: userProps.lastName ?? '',
                USER_PASSWORD: userProps.password ?? '',
                USER_EMAIL: userProps.email ?? '',
                USER_TYPE_USER: userProps.typeUser ?? '',
                USER_ADMIN_EMAIL: userProps.managedBy ?? '',
                USER_PROFILE: userProps.profile
            }
        });

    };

    static async findByEmail(email: string) {
        return await prisma.fT_USER.findFirst({
            where: {
                USER_EMAIL: email
            }
        });
    };

    static async findById(id: number) {
        return await prisma.fT_USER.findUnique({
            where: {
                USER_ID: id
            }
        });
    };

};