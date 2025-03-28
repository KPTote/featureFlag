import { EncryptPassUser } from "../../../configs";
import { UserRepository } from "../../../data/repositories";
import { CustomError } from "../../../domain/errors/custom.error";
import { UserLogAction } from "../../../enums/user-log-action.enum";
import { User } from "../../../interfaces/user.interface";
import { InsertIntoLogService } from '../user-log/insert-into-log.service';



export class UserService {

    constructor(
        private readonly insertIntoLogService: InsertIntoLogService
    ) { };


    public async updateUser(id: number, user: User, emailAdmin: string) {

        const userExist = await UserRepository.verifyById(id);

        if (!userExist) {
            throw CustomError.badRequest(`User don't found`);
        };


        try {

            const userUpdated = await UserRepository.updateUser(id, user);

            this.insertIntoLogService.intoUserLog({
                firstName: user.firstName,
                lastName: user.lastName,
                action: UserLogAction.UPDATE,
                email: emailAdmin
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

            this.insertIntoLogService.intoUserLog({
                firstName: changePass.USER_FIRSTNAME,
                lastName: changePass.USER_LASTNAME,
                action: UserLogAction.UPDATE_PASS,
                email: changePass.USER_EMAIL
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


    //TODO: VERIFICAR CÓMO ELIMINAR EL USUARIO SIN AFECTAR EL LOG

    public async deleteUser(emailUser: string, emailAdmin: string){

        const userExist = await UserRepository.verifyByEmail(emailUser);

        if (!userExist) {
            throw CustomError.badRequest(`User don't found`);
        };

        try {

            const changePass = await UserRepository.deleteUser(emailUser);

            this.insertIntoLogService.intoUserLog({
                firstName: changePass.USER_FIRSTNAME,
                lastName: changePass.USER_LASTNAME,
                action: UserLogAction.DELETE,
                email: emailAdmin
            });

            return {
                firstName: changePass.USER_FIRSTNAME,
                lastName: changePass.USER_LASTNAME,
                email: changePass.USER_EMAIL,
                deleted: 'OK'
            };


        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        };

    };

};