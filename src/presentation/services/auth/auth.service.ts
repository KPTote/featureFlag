import { EncryptPassUser } from "../../../configs";
import { AuthRepository } from "../../../data/repositories";
import { LoginUserDto } from "../../../domain/dtos";
import { CustomError } from "../../../domain/errors/custom.error";
import { ENUM_TYPE_USER } from "../../../enums";
import { UserLogAction } from "../../../enums/user-log-action.enum";
import { User } from "../../../interfaces/user.interface";
import { UserLogService } from "../user-log/user-log.service";
import { actionUserMessage } from "../utils/log-actions";




export class AuthService {

    constructor(
        private readonly userLogService: UserLogService
    ) { }

    public async registerUser(registerUserDto: User, emailAdmin: string) {


        const emailExist = await AuthRepository.findByEmail(registerUserDto.email);


        if (emailExist) {
            throw CustomError.badRequest('Email aready exist');
        };


        if(registerUserDto.typeUser === ENUM_TYPE_USER.TESTER){
            const verifyAdmin = await AuthRepository.findByEmail(emailAdmin);

            if (!verifyAdmin) {
                throw CustomError.badRequest('Invalid administrator');
            };

            if(verifyAdmin.USER_PROFILE !== registerUserDto.profile){
                throw CustomError.badRequest('Profile must be the same with their administrador');
            };

            registerUserDto.managedBy = verifyAdmin.USER_EMAIL;
        };


        try {


            registerUserDto.password = EncryptPassUser.hash(registerUserDto.password);

            const { USER_FIRSTNAME, USER_LASTNAME, USER_EMAIL } = await AuthRepository.create(registerUserDto);

            this.userLogService.createEvent({
                firstName: USER_FIRSTNAME,
                lastName: USER_LASTNAME,
                action: UserLogAction.CREATE,
                actionMessage: actionUserMessage({
                    action: UserLogAction.CREATE, 
                    firstName: USER_FIRSTNAME, 
                    lastName: USER_LASTNAME,
                    email: USER_EMAIL
                }),
                emailExecutedBy: emailAdmin,
                emailUserAffected: USER_EMAIL
            });


            return {
                userFirstName: USER_FIRSTNAME,
                userLastName: USER_LASTNAME,
                userEmail: USER_EMAIL
            };



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