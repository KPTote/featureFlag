import { prisma } from "../postgres";


export class UserHistoryRepository {


    static async get() {

        return await prisma.fT_LOG_USER.findMany({
            include: {
                user: {
                    select: {
                        USER_FIRSTNAME: true,
                        USER_LASTNAME: true,
                        USER_EMAIL: true
                    }
                }
            }
        });

    };

};