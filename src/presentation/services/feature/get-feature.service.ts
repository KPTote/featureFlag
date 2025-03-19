import { FeatureRepository } from "../../../data/repositories";
import { CustomError } from "../../../domain/errors/custom.error";


export class GetFeatureService {

    public async getAllFeatures() {

        try {

            return await FeatureRepository.getAll();

        } catch (error) {
            throw CustomError.internalServer(`${error}`);

        };

    };

    public async getFeature(id: number) {

        const checkFeature = await FeatureRepository.findById(id);

        if (!checkFeature) {
            throw CustomError.badRequest('Feature does not exist');
        };

        try {

            return await FeatureRepository.findById(id)
            
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
            
        }

    };


};