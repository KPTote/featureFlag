import { dbFS } from "../../app";
import { FeatureLogRepositoryProps } from "../../interfaces/feature.interface";
import { UserModel } from "../indext";


export class FeatureLogRepository {


    static async insert(props: FeatureLogRepositoryProps) {

        return await dbFS.collection('featureLog').add({
            featureConfig: props.featureConfig,
            executedBy: props.executedBy,
            featureProfile: props.featureProfile,
            browser: props.browser,
            dateTimeExecution: props.dateTime
        });

    };

    static async getAll() {
        const logs = await dbFS.collection('featureLog').get();

        return logs.docs.map(doc => doc.data());
    };

    static async getByEmail(email: string) {

        const snapshot = await dbFS.collection('featureLog').get();

        const getLogs: FeatureLogRepositoryProps[] = snapshot.docs.map(doc => {
            return {
                featureConfig: doc.get('featureConfig'),
                featureProfile: doc.get('featureProfile'),
                executedBy: doc.get('executedBy'),
                dateTime: doc.get('dateTimeExecution'),
                browser: doc.get('browser')
            }
        });


        return getLogs.filter(doc => doc.executedBy === email)
    }

    static async getUser(email: string) {
        return await UserModel.find({
            email
        });
    }

};