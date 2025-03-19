import { FeatureRepository } from '../../../data/repositories/feature.repository';
import { CreateFeatureDto } from '../../../domain/dtos/feature/create-feature.dto';
import { CustomError } from '../../../domain/errors/custom.error';


export class CreateFeatureService {



    public async createFeature(createFeatureDto: CreateFeatureDto) {

        try {

            const { FTRE_NAME, FTRE_LINE, FTRE_STATUS } = await FeatureRepository.create(createFeatureDto.featureProps);

            return {
                FTRE_NAME,
                FTRE_LINE,
                FTRE_STATUS
            };


        } catch (error) {
            throw CustomError.internalServer(`${error}`);

        };

    };




};