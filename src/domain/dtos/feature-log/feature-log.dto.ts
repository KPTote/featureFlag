import { Profile, StatusFeature } from "../../../enums";
import { FeatureLogServiceProps } from "../../../interfaces/feature.interface";


export class FeatureLogDto {

    public readonly featureStatus: string;
    public readonly featureName: string;
    public readonly featureProfile: Profile;

    constructor(
        featureStatus: string, featureName: string, featureProfile: Profile
    ) {
        this.featureStatus = featureStatus;
        this.featureName = featureName;
        this.featureProfile = featureProfile;
    };

    static insertIntoLog(props: FeatureLogServiceProps): [string?, FeatureLogDto?] {


        const { featureStatus, featureName, featureProfile } = props;

        if (!featureStatus) {
            return ['Missing feature status'];
        };

        if (featureStatus && ![StatusFeature.ON, StatusFeature.OFF].some(state => state === featureStatus)) {
            return ['Status incorrect'];
        };

        if (!featureName) {
            return ['Missing feature name'];
        };

        if (!featureProfile) {
            return ['Missing profile'];
        };

        if (featureProfile && ![Profile.BANPAIS, Profile.BIESV, Profile.BIPA].some(prof => prof === featureProfile)) {
            return ['Profile incorrect'];
        };


        return [undefined, new FeatureLogDto(props.featureStatus, props.featureName, props.featureProfile)];


    };



};