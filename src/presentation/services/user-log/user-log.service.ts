import { UserLogRepository } from "../../../data/repositories";
import { CustomError } from "../../../domain/errors/custom.error";
import { CreateUserLog, UserHistoryLog } from "../../../interfaces/user-log.interface";


export class UserLogService {

    public async createEvent(props: CreateUserLog) {

        try {

            return  await UserLogRepository.insert(props);

        } catch (error) {
            throw CustomError.internalServer(`${error}`);

        }

    };

    public async getAll(){

        try {
            
            const logs = await UserLogRepository.get();
            
            const logsArr: UserHistoryLog[] = logs.map( logs => {
                return {
                    logId: logs.LOGU_ID,
                    dateTime: logs.LOGU_DATE_TIME,
                    details: logs.LOGU_DETAILS,
                    performedByUser: {
                        id: logs.USER_ID,
                        firstName: logs.user.USER_FIRSTNAME,
                        lastName: logs.user.USER_LASTNAME,
                        email: logs.user.USER_EMAIL
                    }
                }
            } );
            
            return logsArr;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
            
        };

    };


};