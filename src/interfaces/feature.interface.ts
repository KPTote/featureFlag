import { Profile } from "../enums";

export interface FeatureLogServiceProps {
    featureStatus: string;
    featureName: string;
    featureProfile: Profile;
};

export interface FeatureLogRepositoryProps extends FeatureLogServiceProps{
    executedBy: string,
    dateTime: string
}
