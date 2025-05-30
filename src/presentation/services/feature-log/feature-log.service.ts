import { FeatureLogRepository } from "../../../data/repositories";
import { FeatureLogDto } from "../../../domain/dtos/feature-log/feature-log.dto";
import { CustomError } from "../../../domain/errors/custom.error";


export class FeatureLogService {

    public async createEvent(featureLogDto: FeatureLogDto, executedBy: string) {

        const dateTime = this.getDateTime();
        const propsRepository = { ...featureLogDto, executedBy, dateTime };

        try {

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

            return await FeatureLogRepository.getAll();

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        };
    };

    public async getAllByEmail(email: string) {

        try {

            return await FeatureLogRepository.getByEmail(email);

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


};