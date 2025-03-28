import { CreateUserLog } from "../../interfaces/user-log.interface";
import { prisma } from "../postgres";


export class UserLogRepository {


    static async insert(props: CreateUserLog) {

        return await prisma.fT_LOG_USER.create({
            data: {
                LOGU_DETAILS: props.actionMessage ?? '',
                USER_ID: props.id
            }
        });

    };

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