import { Feature } from "../../interfaces/feature.interface";
import { prisma } from "../postgres";


export class FeatureRepository {


    static async create(featureProps: Feature) {

        return await prisma.fT_FEATURE.create({
            data: {
                FTRE_NAME: featureProps.name,
                FTRE_LINE: featureProps.line,
                FTRE_PROFILE: featureProps.profile,
                FTRE_STATUS: featureProps.statusFeature
            }
        });

    }

    static async update(id: number, featureProps: Feature){

        return await prisma.fT_FEATURE.update({
            where: {
                FTRE_ID: id
            },
            data: {
                FTRE_NAME: featureProps.name,
                FTRE_LINE: featureProps.line,
                FTRE_PROFILE: featureProps.profile,
                FTRE_STATUS: featureProps.statusFeature 
            }
        })

    };

    static async findById(id: number){
        return await prisma.fT_FEATURE.findUnique({
            where: {
                FTRE_ID: id
            }
        })
    };

    static async getAll(){
        return await prisma.fT_FEATURE.findMany();
    };

    static async delete(id: number){
        return await prisma.fT_FEATURE.delete({
            where: {
                FTRE_ID: id
            }
        });
    };

};