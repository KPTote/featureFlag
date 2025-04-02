import { AuthRepository, FeatureRepository } from "../../../data/repositories";
import { CustomError } from "../../../domain/errors/custom.error";
import { Profile, StatusFeature } from "../../../enums";
import { FeatureLogAction } from "../../../enums/feature-log-action.enum";
import { FeatureLogService } from "../feature-log/feature-log.service";
import { actionFeatureMessage } from "../utils/log-actions";


export class DeleteFeatureService {

    constructor(
        private featureLogService: FeatureLogService
    ) { };


    public async deleteFeature(idFeature: number, emailUser: string) {

        await this.validations(idFeature, emailUser);

        try {


            const featureDeleted = await FeatureRepository.delete(idFeature);

            this.featureLogService.createEvent({
                details: actionFeatureMessage(featureDeleted.FTRE_NAME, featureDeleted.FTRE_STATUS as StatusFeature, FeatureLogAction.DELETED),
                executedBy: emailUser,
                featureId: featureDeleted.FTRE_ID,
                featureName: featureDeleted.FTRE_NAME,
                featureProfil: featureDeleted.FTRE_PROFILE as Profile
            });

            return {
                nameFeature: featureDeleted.FTRE_NAME
            }

        } catch (error) {
            throw CustomError.internalServer(`${error}`);

        };

    };

    private async validations(idFeature: number, emailUser: string) {
        const checkFeature = await FeatureRepository.findById(idFeature);

        if (!checkFeature) {
            throw CustomError.badRequest('Feature does not exist');
        };

        const deletedBy = await AuthRepository.findByEmail(emailUser);

        if (!deletedBy) {
            throw CustomError.badRequest('User does not exist');
        };

        if (deletedBy.USER_PROFILE !== checkFeature.FTRE_PROFILE) {
            throw CustomError.badRequest('User profile is incorrect');
        };

    };




};