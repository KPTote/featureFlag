import { Profile } from "../enums";

export interface FeatureLogServiceProps {
    featureConfig: FeatureConfig[];
    browser: string;
    featureProfile: Profile;
};

export interface FeatureConfig {
      serviceCode: string;
      name: string;
      enabled: boolean;
      configType: string;
      description: string;
}

export interface FeatureLogRepositoryProps extends FeatureLogServiceProps{
    executedBy: string,
    dateTime: string
}
