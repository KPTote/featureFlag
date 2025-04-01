import { Profile, StatusFeature } from "../enums";

export interface Feature {
    name: string;
    line: string;
    profile: Profile;
    statusFeature: StatusFeature;
};

export interface CreateFeatureLog {
    details: string;
    executedBy: string;
    featureId: number;
    featureName: string;
    featureProfil: Profile;
};