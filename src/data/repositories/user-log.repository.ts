import { CreateUserLog } from "../../interfaces/user-log.interface";
import { prisma } from "../postgres";


export class UserLogRepository {


    static async insert(props: CreateUserLog) {

        return await prisma.fT_LOG_USER.create({
            data: {
                LOGU_DETAILS: props.actionMessage ?? '',
                LOGU_EXECUTED_BY: props.emailExecutedBy
            }
        });

    };

    static async get() {

        return await prisma.fT_LOG_USER.findMany();

    };

};