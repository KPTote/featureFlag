import { EncryptPassUser, envs, JwtAdapter } from "../../../configs";
import { AuthRepository } from "../../../data/repositories";
import { LoginUserDto } from "../../../domain/dtos";
import { CustomError } from "../../../domain/errors/custom.error";
import { ENUM_TYPE_USER } from "../../../enums";
import { User } from "../../../interfaces/user.interface";




export class AuthService {

    public async registerUser(registerUserDto: User, emailAdmin: string) {

        const emailExist = await AuthRepository.findByEmail(registerUserDto.email);

        if (emailExist) {
            throw CustomError.badRequest('Email aready exist');
        };


        if (registerUserDto.typeUser === ENUM_TYPE_USER.TESTER) {
            const verifyAdmin = await AuthRepository.findByEmail(emailAdmin);

            if (!verifyAdmin) {
                throw CustomError.badRequest('Invalid administrator');
            };

            if (verifyAdmin.typeUser !== ENUM_TYPE_USER.ADMIN) {
                throw CustomError.badRequest('Invalid administrator');
            }

            if (verifyAdmin.profile !== registerUserDto.profile) {
                throw CustomError.badRequest('Profile must be the same with their administrador');
            };

            registerUserDto.managedBy = verifyAdmin.email!;
        };


        try {


            registerUserDto.password = EncryptPassUser.hash(registerUserDto.password);

            const newUser = await AuthRepository.create(registerUserDto);

            return {
                userId: newUser.id,
                email: registerUserDto.email,
                typeUser: registerUserDto.typeUser
            }


        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        };


    };

    public async login(loginUserDto: LoginUserDto) {

        const { email, password } = loginUserDto;

        const emailExist = await AuthRepository.findByEmail(email);

        if (!emailExist) {
            throw CustomError.badRequest("Email doesn't exist");
        };


        const isMatching = EncryptPassUser.compare(password, emailExist.password);

        if (!isMatching) {
            throw CustomError.badRequest("Invalid User or Password");
        };

        const token = await JwtAdapter.generateToken({ email }, envs.JWT_TIME);

        if (!token) {
            throw CustomError.badRequest("Error while creating JWT");
        };


        return {
            email: emailExist.email,
            firstName: emailExist.firstName,
            lastName: emailExist.lastName,
            token
        };

    };



};