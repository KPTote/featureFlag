import { Profile } from "../../../enums";
import { FeatureConfig, FeatureLogServiceProps } from "../../../interfaces/feature.interface";


export class FeatureLogDto {

    public readonly featureConfig: FeatureConfig[];
    public readonly browser: string;
    public readonly featureProfile: Profile;

    constructor(
        featureConfig: FeatureConfig[], browser: string, featureProfile: Profile
    ) {
        this.featureConfig = featureConfig;
        this.browser = browser;
        this.featureProfile = featureProfile;
    };

    static insertIntoLog(props: FeatureLogServiceProps): [string?, FeatureLogDto?] {


        const { featureConfig, browser, featureProfile } = props;

        if (!featureConfig) {
            return ['Missing feature configuration'];
        };

        if (!browser) {
            return ['Missing browser information'];
        };

        if (!featureProfile) {
            return ['Missing profile'];
        };

        if (featureProfile && ![Profile.BANPAIS, Profile.BIESV, Profile.BIPA].some(prof => prof === featureProfile)) {
            return ['Profile incorrect'];
        };


        return [undefined, new FeatureLogDto(props.featureConfig, props.browser, props.featureProfile)];


    };



};