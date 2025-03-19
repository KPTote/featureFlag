import { EncryptPassUser } from "../../../configs";
import { AuthRepository } from "../../../data/repositories";
import { LoginUserDto, RegisterUserDto } from "../../../domain/dtos";
import { UserEntity } from "../../../domain/entities/user.entity";
import { CustomError } from "../../../domain/errors/custom.error";



export class AuthService {

    public async registerUser(registerUserDto: RegisterUserDto) {


        const emailExist = await AuthRepository.findEmail(registerUserDto.userProps.email);

        if (emailExist) {
            throw CustomError.badRequest('Email aready exist');
        };

        try {

            const { userProps } = new UserEntity(registerUserDto.userProps);

            userProps.password = EncryptPassUser.hash(userProps.password);

            const { USER_FIRSTNAME, USER_LASTNAME, USER_EMAIL } = await AuthRepository.create(userProps);

            return {
                USER_FIRSTNAME,
                USER_LASTNAME,
                USER_EMAIL
            };



        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        };


    };

    public async login(loginUserDto: LoginUserDto) {

        const { email, password } = loginUserDto;

        const emailExist = await AuthRepository.findEmail(email);

        if (!emailExist) {
            throw CustomError.badRequest("Email doesn't exist");
        };

        const isMatching = EncryptPassUser.compare(password, emailExist.USER_PASSWORD);

        if (!isMatching) {
            throw CustomError.badRequest("Invalid User or Password");
        };


        return {
            email: emailExist.USER_EMAIL,
            firstName: emailExist.USER_FIRSTNAME,
            lastName: emailExist.USER_LASTNAME
        };

    };


};