import { DashboardUserRepository } from "../../../data/repositories";
import { CustomError } from "../../../domain/errors/custom.error";


export class DashboardUserService {

    public async getAllUsers() {

        try {
            return await DashboardUserRepository.getAllUsers();
        } catch (error) {
            throw CustomError.internalServer(`${error}`);

        }
    };

    public async getUsersByAdmin(email: string){

        try {
            return await DashboardUserRepository.getUsersByAdmin(email);
            
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
            
        }

    };

};