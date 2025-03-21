import { FeatureRepository } from '../../../data/repositories';
import { CreateFeatureDto } from '../../../domain/dtos/feature/create-feature.dto';
import { CustomError } from '../../../domain/errors/custom.error';


export class CreateFeatureService {



    public async createFeature(createFeatureDto: CreateFeatureDto) {

        try {

            const featureExist = await FeatureRepository.findByName(createFeatureDto.featureProps.name);

            if (featureExist) {
                throw CustomError.badRequest('Feature already exist');
            }

            const { FTRE_NAME, FTRE_LINE, FTRE_STATUS } = await FeatureRepository.create(createFeatureDto.featureProps);

            return {
                FTRE_NAME,
                FTRE_LINE,
                FTRE_STATUS
            };


        } catch (error) {
            if (!(error instanceof CustomError)) {
                throw CustomError.internalServer(`${error}`);
            };


            throw error;

        };

    };


};