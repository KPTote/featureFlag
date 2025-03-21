import { prisma } from "../postgres";



export class DashboardUserRepository {


    static async getAllUsers(){
        return await prisma.fT_USER.findMany();
    };

    static async getUsersByAdmin(id: number){
        return await prisma.fT_USER.findMany({
            where: {
                USER_ADMIN_ID: id
            }
        });
    }

};