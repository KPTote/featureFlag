import { AuthRepository, FeatureRepository } from "../../../data/repositories";
import { CustomError } from "../../../domain/errors/custom.error";


export class GetFeatureService {

    public async getAllFeatures(emailUser: string) {

        const user = await AuthRepository.findByEmail(emailUser);


        if (!user) {
            throw CustomError.badRequest('User does not exist S');
        };

        try {

            return await FeatureRepository.getAll(user.USER_PROFILE ?? '' , user.USER_TYPE_USER);

        } catch (error) {
            throw CustomError.internalServer(`${error}`);

        };

    };

    public async getFeature(id: number) {

        const checkFeature = await FeatureRepository.findById(id);

        if (!checkFeature) {
            throw CustomError.badRequest('Feature does not exist');
        };

        try {

            return await FeatureRepository.findById(id)

        } catch (error) {
            throw CustomError.internalServer(`${error}`);

        }

    };


};