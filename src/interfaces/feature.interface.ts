import { Profile, StatusFeature } from "../enums";

export interface Feature{
    name: string;
    line: string;
    profile: Profile;
    statusFeature: StatusFeature;
};