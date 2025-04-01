import { prisma } from "../postgres";



export class DashboardUserRepository {


    static async getAllUsers(){
        return await prisma.fT_USER.findMany();
    };

    static async getUsersByAdmin(email: string){
        return await prisma.fT_USER.findMany({
            where: {
                USER_ADMIN_EMAIL: email
            }
        });
    }

};