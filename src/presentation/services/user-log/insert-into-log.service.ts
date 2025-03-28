import { UserRepository } from "../../../data/repositories";
import { IntoUserLog } from "../../../interfaces/user-log.interface";
import { actionUserMessage } from "../utils/log-actions";
import { UserLogService } from "./user-log.service";

export class InsertIntoLogService {

    constructor(
        private readonly userLogService: UserLogService
    ) { };

    async intoUserLog(props: IntoUserLog) {

        const user = await UserRepository.verifyByEmail(props.email ?? '');

        this.userLogService.createEvent({
            id: Number(user?.USER_ID),
            firstName: props.firstName,
            lastName: props.lastName,
            action: props.action,
            actionMessage: actionUserMessage(props.action, props.firstName, props.lastName),
            email: props.email
        });

    };


};