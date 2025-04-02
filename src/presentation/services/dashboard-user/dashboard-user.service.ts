import { DashboardUserRepository } from "../../../data/repositories";
import { CustomError } from "../../../domain/errors/custom.error";


export class DashboardUserService {

    public async getAllUsers() {

        try {

            const users = await DashboardUserRepository.getAllUsers();

            return users.map(user => {
                return {
                    firstName: user.USER_FIRSTNAME,
                    secondName: user.USER_LASTNAME,
                    email: user.USER_EMAIL,
                    typeUser: user.USER_TYPE_USER,
                    profile: user.USER_PROFILE,
                    managedBy: user.USER_ADMIN_EMAIL
                };
            });

        } catch (error) {
            throw CustomError.internalServer(`${error}`);

        }
    };

    public async getUsersByAdmin(email: string) {

        try {
            const users = await DashboardUserRepository.getUsersByAdmin(email);

            return users.map(user => {
                return {
                    firstName: user.USER_FIRSTNAME,
                    secondName: user.USER_LASTNAME,
                    email: user.USER_EMAIL,
                    typeUser: user.USER_TYPE_USER,
                    profile: user.USER_PROFILE,
                    managedBy: user.USER_ADMIN_EMAIL
                };
            });

        } catch (error) {
            throw CustomError.internalServer(`${error}`);

        }

    };

};