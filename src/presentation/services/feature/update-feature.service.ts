import { AuthRepository, FeatureRepository } from '../../../data/repositories';
import { UpdateFeatureDto } from '../../../domain/dtos';
import { CustomError } from '../../../domain/errors/custom.error';
import { ENUM_TYPE_USER, StatusFeature } from '../../../enums';
import { Feature } from '../../../interfaces/feature.interface';


export class UpdateFeatureService {



    public async updateFeature(updateFeatureDto: UpdateFeatureDto, idFeature: number, emailUser: string) {

        const checkFeature = await FeatureRepository.findById(idFeature);

        if (!checkFeature) {
            throw CustomError.badRequest('Feature does not exist');
        };

        const user = await AuthRepository.findByEmail(emailUser);

        if (!user) {
            throw CustomError.badRequest('User does not exist S');
        };

        if (user.USER_TYPE_USER === ENUM_TYPE_USER.TESTER) {
            const updateStatus = this.featureForTesterUser(checkFeature, updateFeatureDto.feature.statusFeature);
            return await FeatureRepository.update(idFeature, updateStatus);
        };

        try {

            return await FeatureRepository.update(idFeature, updateFeatureDto.feature);

        } catch (error) {
            throw CustomError.internalServer(`${error}`);

        };

    };


    public featureForTesterUser = (feature: { [key: string]: any }, status: StatusFeature): Feature => {
        return {
            name: feature.FTRE_NAME,
            line: feature.FTRE_LINE,
            profile: feature.FTRE_PROFILE,
            statusFeature: status
        }
    };



};