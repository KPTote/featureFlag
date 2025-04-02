import { CreateFeatureLog } from "../../interfaces/feature.interface";
import { prisma } from "../postgres";


export class FeatureLogRepository {


    static async insert(props: CreateFeatureLog) {

        return await prisma.fT_LOG_FEATURE.create({
            data: {
                LOGF_DETAILS: props.details,
                LOGF_EXECUTED_BY: props.executedBy,
                LOGF_FEATURE_ID: props.featureId,
                LOGF_FEATURE_NAME: props.featureName,
                LOGF_FEATURE_PROFILE: props.featureProfil
            }
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