import { FeatureLogRepositoryProps } from "../../interfaces/feature.interface";
import { UserModel } from "../indext";
import { FeatureLogSchema } from "../mongo/models/feature-log";


export class FeatureLogRepository {


    static async insert(props: FeatureLogRepositoryProps) {

        return await FeatureLogSchema.insertOne({
            featureConfig: props.featureConfig,
            executedBy: props.executedBy,
            featureProfile: props.featureProfile,
            browser: props.browser,
            dateTimeExecution: props.dateTime
        });

    };

    static async getAll() {
        return await FeatureLogSchema.find();
    };

    static async getByEmail(email: string) {

        return await FeatureLogSchema.find({
            executedBy: email
        });
    }

    static async getUser(email: string) {
        return await UserModel.find({
            email
        });
    }

};