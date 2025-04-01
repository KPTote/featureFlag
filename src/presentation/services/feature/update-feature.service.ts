import { AuthRepository, FeatureRepository } from '../../../data/repositories';
import { UpdateFeatureDto } from '../../../domain/dtos';
import { CustomError } from '../../../domain/errors/custom.error';
import { ENUM_TYPE_USER, Profile, StatusFeature } from '../../../enums';
import { FeatureLogAction } from '../../../enums/feature-log-action.enum';
import { Feature } from '../../../interfaces/feature.interface';
import { FeatureLogService } from '../feature-log/feature-log.service';
import { actionFeatureMessage } from '../utils/log-actions';


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



        try {

            if (user.USER_TYPE_USER === ENUM_TYPE_USER.TESTER) {
                const updateStatus = this.featureForTesterUser(checkFeature, updateFeatureDto.feature.statusFeature);
                const feature = await FeatureRepository.update(idFeature, updateStatus);

                FeatureLogService.createEvent({
                    details: actionFeatureMessage(feature.FTRE_NAME, feature.FTRE_STATUS as StatusFeature, FeatureLogAction.UPDATE_STATUS),
                    executedBy: emailUser,
                    featureId: feature.FTRE_ID,
                    featureName: feature.FTRE_NAME,
                    featureProfil: feature.FTRE_PROFILE as Profile
                });

                return feature;

            };

            const feature = await FeatureRepository.update(idFeature, updateFeatureDto.feature);

            FeatureLogService.createEvent({
                details: actionFeatureMessage(feature.FTRE_NAME, feature.FTRE_STATUS as StatusFeature, FeatureLogAction.UPDATE),
                executedBy: emailUser,
                featureId: feature.FTRE_ID,
                featureName: feature.FTRE_NAME,
                featureProfil: feature.FTRE_PROFILE as Profile
            });

            return feature

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