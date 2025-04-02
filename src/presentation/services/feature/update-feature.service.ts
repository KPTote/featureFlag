import { AuthRepository, FeatureRepository } from '../../../data/repositories';
import { UpdateFeatureDto } from '../../../domain/dtos';
import { CustomError } from '../../../domain/errors/custom.error';
import { ENUM_TYPE_USER, Profile, StatusFeature } from '../../../enums';
import { FeatureLogAction } from '../../../enums/feature-log-action.enum';
import { Feature } from '../../../interfaces/feature.interface';
import { FeatureLogService } from '../feature-log/feature-log.service';
import { actionFeatureMessage } from '../utils/log-actions';


export class UpdateFeatureService {

    constructor(
        private featureLogService: FeatureLogService

    ) { };

    public async updateFeature(updateFeatureDto: UpdateFeatureDto, idFeature: number, emailUser: string) {


        const { checkFeature, user } = await this.validateUpdateFeature(idFeature, emailUser);

        try {

            if (user.USER_TYPE_USER === ENUM_TYPE_USER.TESTER) {
                const updateStatus = this.featureForTesterUser(checkFeature, updateFeatureDto.feature.statusFeature);
                const feature = await FeatureRepository.update(idFeature, updateStatus);

                await this.createLog(feature, emailUser, FeatureLogAction.UPDATE_STATUS);

                return feature;

            };

            const feature = await FeatureRepository.update(idFeature, updateFeatureDto.feature);

            await this.createLog(feature, emailUser, FeatureLogAction.UPDATE);

            return feature;

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

    private async validateUpdateFeature(idFeature: number, emailUser: string) {
        const checkFeature = await FeatureRepository.findById(idFeature);
        if (!checkFeature) {
            throw CustomError.badRequest('Feature does not exist');
        }

        const user = await AuthRepository.findByEmail(emailUser);
        if (!user) {
            throw CustomError.badRequest('User does not exist');
        }

        if ((user.USER_TYPE_USER === ENUM_TYPE_USER.ADMIN || user.USER_TYPE_USER === ENUM_TYPE_USER.TESTER) &&
            user.USER_PROFILE !== checkFeature.FTRE_PROFILE) {
            throw CustomError.badRequest('User profile is incorrect');
        }

        return { checkFeature, user };
    };

    private async createLog(feature: any, emailUser: string, logAction: FeatureLogAction) {

        this.featureLogService.createEvent({
            details: actionFeatureMessage(feature.FTRE_NAME, feature.FTRE_STATUS as StatusFeature, logAction),
            executedBy: emailUser,
            featureId: feature.FTRE_ID,
            featureName: feature.FTRE_NAME,
            featureProfil: feature.FTRE_PROFILE as Profile
        });
    }


};