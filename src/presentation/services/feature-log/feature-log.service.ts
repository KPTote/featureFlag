import { FeatureLogRepository } from "../../../data/repositories";
import { CustomError } from "../../../domain/errors/custom.error";
import { CreateFeatureLog } from "../../../interfaces/feature.interface";


export class FeatureLogService {

    public async createEvent(props: CreateFeatureLog) {

        try {

            return await FeatureLogRepository.insert(props);

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        };


    };

    public async getAll() {
        try {

            return await FeatureLogRepository.getAll();

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        };
    };

    public async getAllByEmail(email: string){

        try {

            return await FeatureLogRepository.getByEmail(email);

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        };
    };


};