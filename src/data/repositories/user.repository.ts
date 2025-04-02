import { User } from "../../interfaces/user.interface";
import { prisma } from "../postgres";


export class UserRepository {

    static async updateUser(id: number, user: User) {
        return await prisma.fT_USER.update({
            where: {
                USER_ID: id
            },
            data: {
                USER_FIRSTNAME: user.firstName,
                USER_LASTNAME: user.lastName,
                USER_PROFILE: user.profile,
                USER_PASSWORD: user.password,
                USER_TYPE_USER: user.typeUser,
                USER_ADMIN_EMAIL: user.managedBy,
                USER_EMAIL: user.email
            }
        });
    };

    static async changePassword(email: string, newPass: string){
        return await prisma.fT_USER.update({
            where: {
                USER_EMAIL: email 
            },
            data: {
                USER_PASSWORD: newPass
            }
        });
    };

    static async deleteUser(email: string){
        return await prisma.fT_USER.delete({
            where: {
                USER_EMAIL: email
            }
        });
    };

    static async verifyByEmail(email: string) {

        return await prisma.fT_USER.findUnique({
            where: {
                USER_EMAIL: email
            }
        });
    };

    static async verifyById(id: number) {
        return await prisma.fT_USER.findUnique({
            where: {
                USER_ID: id
            }
        });
    };

};