import { AuthRepository, FeatureRepository } from '../../../data/repositories';
import { CreateFeatureDto } from '../../../domain/dtos/feature/create-feature.dto';
import { CustomError } from '../../../domain/errors/custom.error';
import { ENUM_TYPE_USER } from '../../../enums';
import { TypeUserVerificationService } from '../utils/type-user-verification.service';


export class CreateFeatureService {


    constructor(
        private typeUserVerificationService: TypeUserVerificationService
    ){};



    public async createFeature(createFeatureDto: CreateFeatureDto) {

        try {

            const { FTRE_NAME, FTRE_LINE, FTRE_STATUS } = await FeatureRepository.create(createFeatureDto.featureProps);

            return {
                FTRE_NAME,
                FTRE_LINE,
                FTRE_STATUS
            };


        } catch (error) {
            throw CustomError.internalServer(`${error}`);

        };

    };

    

    public async verifyTypeUser(email: string){


        try {
            const user = await AuthRepository.findEmail(email);

            if(!user){
                throw CustomError.internalServer(`User don't exist`);
            };

            return user.USER_TYPE_USER !== ENUM_TYPE_USER.TESTER;


        } catch (error) {
            
        }

        // return this.typeUserVerificationService.verify(user);
    };


};