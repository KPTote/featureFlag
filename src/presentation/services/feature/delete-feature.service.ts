import { FeatureRepository } from "../../../data/repositories";
import { CustomError } from "../../../domain/errors/custom.error";


export class DeleteFeatureService {



    public async deleteFeature(idFeature: number) {

        const checkFeature = await FeatureRepository.findById(idFeature);

        if (!checkFeature) {
            throw CustomError.badRequest('Feature does not exist');
        };

        try {

            return await FeatureRepository.delete(idFeature);

        } catch (error) {
            throw CustomError.internalServer(`${error}`);

        };

    };




};