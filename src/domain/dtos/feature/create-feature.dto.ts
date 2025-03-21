import { Profile, StatusFeature } from "../../../enums";
import { Feature } from "../../../interfaces/feature.interface";



export class CreateFeatureDto {


    constructor(
        public featureProps: Feature
    ) { };

    static create(props: {[key:string]: any}): [string?, CreateFeatureDto?] {

        const {
            name,
            line,
            profile,
            statusFeature
        } = props;


        if(!name){
            return ['Missing Name'];
        };

        if(!line){
            return ['Missing line of work'];
        };

        if(!profile){
            return ['Missing profile'];
        };

        if(profile && ![Profile.BANPAIS, Profile.BIESV, Profile.BIPA ].some(prof => prof === profile )){
            return ['Profile incorrect'];
        };

        if(!statusFeature){
            return ['Missing status feature'];
        };

        if(statusFeature && ![StatusFeature.ON, StatusFeature.OFF].some(state => state === String(statusFeature).toUpperCase())){
            return ['Status incorrect'];
        };

        return [undefined, new CreateFeatureDto(props as Feature)];

    };

};