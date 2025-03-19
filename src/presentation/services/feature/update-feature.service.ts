import { FeatureRepository } from '../../../data/repositories';
import { UpdateFeatureDto } from '../../../domain/dtos';
import { CustomError } from '../../../domain/errors/custom.error';


export class UpdateFeatureService {



    public async updateFeature(updateFeatureDto: UpdateFeatureDto, idFeature: number) {

        const checkFeature = await FeatureRepository.findById(idFeature);

        if (!checkFeature) {
            throw CustomError.badRequest('Feature does not exist');
        };

        try {

            return await FeatureRepository.update(idFeature, updateFeatureDto.feature);

        } catch (error) {
            throw CustomError.internalServer(`${error}`);

        };

    };




};