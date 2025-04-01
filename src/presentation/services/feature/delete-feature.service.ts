import { FeatureRepository } from "../../../data/repositories";
import { CustomError } from "../../../domain/errors/custom.error";
import { Profile, StatusFeature } from "../../../enums";
import { FeatureLogAction } from "../../../enums/feature-log-action.enum";
import { FeatureLogService } from "../feature-log/feature-log.service";
import { actionFeatureMessage } from "../utils/log-actions";


export class DeleteFeatureService {



    public async deleteFeature(idFeature: number, emailUser: string) {

        const checkFeature = await FeatureRepository.findById(idFeature);

        if (!checkFeature) {
            throw CustomError.badRequest('Feature does not exist');
        };

        try {

            const featureDeleted = await FeatureRepository.delete(idFeature);

            FeatureLogService.createEvent({
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




};