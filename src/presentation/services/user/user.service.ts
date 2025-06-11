import { EncryptPassUser } from "../../../configs";
import { UserRepository } from "../../../data/repositories";
import { CustomError } from "../../../domain/errors/custom.error";



export class UserService {

    public async changePassword(email: string, newPass: string) {

        const userExist = await UserRepository.verifyByEmail(email);

        if (!userExist) {
            throw CustomError.badRequest(`User don't found`);
        };

        try {

            const hash = EncryptPassUser.hash(newPass);
            await UserRepository.changePassword(email, hash);

            return {
                firstName: userExist.firstName,
                lastName: userExist.lastName,
                email: userExist.email
            }


        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        };

    };


    public async deleteUser(emailUser: string, emailAdmin: string) {

        await this.validationsForDelete(emailUser, emailAdmin);

        try {

            await UserRepository.deleteUser(emailUser);

            return {
                email: emailUser,
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

        if (useradmin.profile !== userExist.profile) {
            throw CustomError.badRequest('User profile is incorrect');
        };
    };



};