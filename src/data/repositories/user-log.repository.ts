import { CreateUserLog } from "../../interfaces/user-log.interface";
import { UserLogSchema } from "../mongo/models/users-logs";
import { prisma } from "../postgres-client";



export class UserLogRepository {


    static async insert(props: CreateUserLog) {

        console.log(props);

        return await UserLogSchema.insertOne({
            details: props.actionMessage ?? '',
            executedBy: props.emailExecutedBy
        });

    };

    static async get() {

        return await prisma.fT_LOG_USER.findMany();

    };

};