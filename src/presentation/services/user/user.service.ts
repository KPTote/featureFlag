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

            await this.insertIntoLog(userUpdated, UserLogAction.UPDATE, emailAdmin);

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

            await this.insertIntoLog(changePass, UserLogAction.UPDATE_PASS, changePass.USER_EMAIL);

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

        await this.validationsForDelete(emailUser, emailAdmin);

        try {

            const userDeleted = await UserRepository.deleteUser(emailUser);

            await this.insertIntoLog(userDeleted, UserLogAction.DELETE, emailAdmin);

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

    private async validationsForDelete(emailUser: string, emailAdmin: string) {
        const userExist = await UserRepository.verifyByEmail(emailUser);

        if (!userExist) {
            throw CustomError.badRequest(`User don't found`);
        };

        const useradmin = await UserRepository.verifyByEmail(emailAdmin);

        if (!useradmin) {
            throw CustomError.badRequest(`User don't found`);
        };

        if (useradmin.USER_PROFILE !== userExist.USER_PROFILE) {
            throw CustomError.badRequest('User profile is incorrect');
        };
    };

    private async insertIntoLog(user: any, action: UserLogAction, emailAdmin: string) {
        this.userLogService.createEvent({
            firstName: user.USER_FIRSTNAME,
            lastName: user.USER_LASTNAME,
            action: action,
            actionMessage: actionUserMessage({
                action: action,
                firstName: user.USER_FIRSTNAME,
                lastName: user.USER_LASTNAME,
                email: user.USER_EMAIL
            }),
            emailExecutedBy: emailAdmin,
            emailUserAffected: user.USER_EMAIL
        });
    }

};