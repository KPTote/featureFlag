import { AuthRepository, FeatureRepository } from '../../../data/repositories';
import { CreateFeatureDto } from '../../../domain/dtos/feature/create-feature.dto';
import { CustomError } from '../../../domain/errors/custom.error';
import { StatusFeature } from '../../../enums';
import { FeatureLogAction } from '../../../enums/feature-log-action.enum';
import { FeatureLogService } from '../feature-log/feature-log.service';
import { actionFeatureMessage } from '../utils/log-actions';


export class CreateFeatureService {

    constructor(
        private featureLogService: FeatureLogService

    ){};



    public async createFeature(createFeatureDto: CreateFeatureDto, emailUser: string) {

        try {

            await this.validations(createFeatureDto, emailUser);

            const { FTRE_NAME, FTRE_LINE, FTRE_STATUS, FTRE_ID } = await FeatureRepository.create(createFeatureDto.featureProps);


            this.featureLogService.createEvent({
                details: actionFeatureMessage(FTRE_NAME, FTRE_STATUS as StatusFeature, FeatureLogAction.CREATED),
                executedBy: emailUser,
                featureId: FTRE_ID,
                featureName: FTRE_NAME,
                featureProfil: createFeatureDto.featureProps.profile
            });

            return {
                nameFeature: FTRE_NAME,
                lineProfile: FTRE_LINE,
                statusFeature: FTRE_STATUS
            };


        } catch (error) {
            if (!(error instanceof CustomError)) {
                throw CustomError.internalServer(`${error}`);
            };


            throw error;

        };

    };

    private async validations(createFeatureDto: CreateFeatureDto, emailUser: string){

        const featureExist = await FeatureRepository.findByName(createFeatureDto.featureProps.name);

        if (featureExist) {
            throw CustomError.badRequest('Feature already exist');
        };

        console.log(emailUser);
        const createdBy = await AuthRepository.findByEmail(emailUser);

        if(!createdBy){
            throw CustomError.badRequest('User does not exist');
        };

        if(createdBy.USER_PROFILE !== createFeatureDto.featureProps.profile){
            throw CustomError.badRequest('User profile is incorrect');
        };


    };


};