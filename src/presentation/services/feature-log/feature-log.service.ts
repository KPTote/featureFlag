import { FeatureLogRepository } from "../../../data/repositories";
import { CustomError } from "../../../domain/errors/custom.error";
import { CreateFeatureLog } from "../../../interfaces/feature.interface";


export class FeatureLogService {

    static async createEvent(props: CreateFeatureLog) {

        try {

            return await FeatureLogRepository.insert(props);

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        };


    };

    static async getAll() {
        try {

            return await FeatureLogRepository.getAll();

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        };
    };


};