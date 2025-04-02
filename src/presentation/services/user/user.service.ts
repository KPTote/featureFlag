import { EncryptPassUser } from "../../../configs";
import { UserRepository } from "../../../data/repositories";
import { CustomError } from "../../../domain/errors/custom.error";
import { UserLogAction } from "../../../enums/user-log-action.enum";
import { User } from "../../../interfaces/user.interface";
import { UserLogService } from "../user-log/user-log.service";
import { actionUserMessage } from "../utils/log-actions";



export class UserService {

    constructor(
        private readonly userLogService: UserLogService

    ) { };


    public async updateUser(id: number, user: User, emailAdmin: string) {

        const userExist = await UserRepository.verifyById(id);

        if (!userExist) {
            throw CustomError.badRequest(`User don't found`);
        };


        try {

            user.password = EncryptPassUser.hash(user.password);

            const userUpdated = await UserRepository.updateUser(id, user);

            this.userLogService.createEvent({
                firstName: user.firstName,
                lastName: user.lastName,
                action: UserLogAction.UPDATE,
                actionMessage: actionUserMessage({
                    action: UserLogAction.CREATE, 
                    firstName: user.firstName, 
                    lastName: user.lastName,
                    email: user.email
                }),
                emailExecutedBy: emailAdmin,
                emailUserAffected: user.email
            });

            return {
                firstName: userUpdated.USER_FIRSTNAME,
                lastName: userUpdated.USER_LASTNAME,
                email: userUpdated.USER_EMAIL
            };

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        };

    };

    public async changePassword(email: string, newPass: string) {

        const userExist = await UserRepository.verifyByEmail(email);

        if (!userExist) {
            throw CustomError.badRequest(`User don't found`);
        };

        try {

            const hash = EncryptPassUser.hash(newPass);
            const changePass = await UserRepository.changePassword(email, hash);

            this.userLogService.createEvent({
                firstName: changePass.USER_FIRSTNAME,
                lastName: changePass.USER_LASTNAME,
                action: UserLogAction.UPDATE_PASS,
                actionMessage: actionUserMessage({
                    action: UserLogAction.UPDATE_PASS, 
                    firstName: changePass.USER_FIRSTNAME, 
                    lastName: changePass.USER_LASTNAME,
                    email: changePass.USER_EMAIL
                }),
                emailExecutedBy: changePass.USER_EMAIL,
                emailUserAffected: changePass.USER_EMAIL
            });

            return {
                firstName: changePass.USER_FIRSTNAME,
                lastName: changePass.USER_LASTNAME,
                email: changePass.USER_EMAIL
            }


        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        };

    };


    public async deleteUser(emailUser: string, emailAdmin: string) {

        const userExist = await UserRepository.verifyByEmail(emailUser);

        if (!userExist) {
            throw CustomError.badRequest(`User don't found`);
        };

        try {

            const userDeleted = await UserRepository.deleteUser(emailUser);

            this.userLogService.createEvent({
                firstName: userDeleted.USER_FIRSTNAME,
                lastName: userDeleted.USER_LASTNAME,
                action: UserLogAction.DELETE,
                actionMessage: actionUserMessage({
                   action: UserLogAction.DELETE, 
                   firstName: userDeleted.USER_FIRSTNAME, 
                   lastName: userDeleted.USER_LASTNAME,
                   email: userDeleted.USER_EMAIL
                }),
                emailExecutedBy: emailAdmin,
                emailUserAffected: userDeleted.USER_EMAIL
            });

            return {
                firstName: userDeleted.USER_FIRSTNAME,
                lastName: userDeleted.USER_LASTNAME,
                email: userDeleted.USER_EMAIL,
                deleted: 'OK'
            };


        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        };

    };

};