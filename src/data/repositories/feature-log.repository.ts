import { FeatureLogRepositoryProps } from "../../interfaces/feature.interface";
import { FeatureLogSchema } from "../mongo/models/feature-log";
import { prisma } from "../postgres-client";

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
        return await prisma.fT_LOG_FEATURE.findMany({
            where: {
                LOGF_EXECUTED_BY: email
            }
        });
    }

};