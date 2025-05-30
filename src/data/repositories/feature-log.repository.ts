import { FeatureLogRepositoryProps } from "../../interfaces/feature.interface";
import { FeatureLogSchema } from "../mongo/models/feature-log";
import { prisma } from "../postgres-client";

export class FeatureLogRepository {


    static async insert(props: FeatureLogRepositoryProps) {

        return await FeatureLogSchema.insertOne({
            featureStatus: props.featureStatus,
            executedBy: props.executedBy,
            featureProfile: props.featureProfile,
            featureName: props.featureName,
            dateTimeExecution: props.dateTime
        });

    };

    static async getAll() {
        return await prisma.fT_LOG_FEATURE.findMany();
    };

    static async getByEmail(email: string) {
        return await prisma.fT_LOG_FEATURE.findMany({
            where: {
                LOGF_EXECUTED_BY: email
            }
        });
    }

};