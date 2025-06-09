import { FeatureLogRepository } from "../../../data/repositories";
import { FeatureLogDto } from "../../../domain/dtos/feature-log/feature-log.dto";
import { CustomError } from "../../../domain/errors/custom.error";


export class FeatureLogService {

    public async createEvent(featureLogDto: FeatureLogDto, executedBy: string) {

        const dateTime = this.getDateTime();
        const propsRepository = { ...featureLogDto, executedBy, dateTime };
        const email = executedBy;

        try {

            const [{profile}] = await FeatureLogRepository.getUser(email);

            if(!profile){
                throw CustomError.badRequest('Invalid User');
            }

            if(!this.verifyProfile(profile, propsRepository.featureProfile)){
                throw CustomError.badRequest('User profile and feature profile must be the same');
            }

            const {executedBy, dateTimeExecution } = await FeatureLogRepository.insert(propsRepository);

            return {
                executedBy,
                dateTimeExecution
            }

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        };


    };

    public async getAll() {
        try {

            const logsList = await FeatureLogRepository.getAll();

            return logsList.map( log => {

                return {
                    configurationUsed: log.featureConfig,
                    featureProfile: log.featureProfile,
                    executedBy: log.executedBy,
                    dateTimeExecution: log.dateTimeExecution,
                    browser: log.browser

                }

            });

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        };
    };

    public async getAllByEmail(email: string) {

        try {

            const logArr = await FeatureLogRepository.getByEmail(email);
            return logArr.map(log => {
                return {
                    featureConfig: log.featureConfig,
                    browser: log.browser,
                    featureProfile: log.featureProfile,
                    dateTimeExecution: log.dateTimeExecution
                }
            });

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        };
    };

    private getDateTime(): string {
        const date = new Date();
        let timePeriod = 'AM';

        if (date.getHours() >= 12) {
            timePeriod = 'PM';
        };

        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${timePeriod}`;
    };

    private verifyProfile(featureProfile: string, userProfile: string):boolean{
        return featureProfile === userProfile;
    }


};