import { Profile, StatusFeature } from "../../../enums";
import { Feature } from "../../../interfaces/feature.interface";



export class UpdateFeatureDto {


    constructor(
        public readonly feature: Feature,
    ) { };

    static update(props: { [key: string]: any }): [string?, UpdateFeatureDto?] {

        const {
            name,
            line,
            profile,
            statusFeature
        } = props;


        if (!name) {
            return ['Missing Name'];
        };

        if (!line) {
            return ['Missing line of work'];
        };

        if (!profile) {
            return ['Missing profile'];
        };

        if (profile && ![Profile.BANPAIS, Profile.BIESV, Profile.BIPA].some(prof => prof === profile)) {
            return ['Profile incorrect'];
        };

        if (!statusFeature) {
            return ['Missing status feature'];
        };

        if (statusFeature && ![StatusFeature.ON, StatusFeature.OFF].some(state => state === statusFeature)) {
            return ['Status incorrect'];
        };
        return [undefined, new UpdateFeatureDto(props as Feature)];

    };

};