"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const configs_1 = require("../../../configs");
const repositories_1 = require("../../../data/repositories");
const user_entity_1 = require("../../../domain/entities/user.entity");
const custom_error_1 = require("../../../domain/errors/custom.error");
class AuthService {
    registerUser(registerUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailExist = yield repositories_1.AuthRepository.findEmail(registerUserDto.userProps.email);
            if (emailExist) {
                throw custom_error_1.CustomError.badRequest('Email aready exist');
            }
            ;
            if (registerUserDto.userProps.adminId) {
                const verifyAdmin = yield repositories_1.AuthRepository.findById(registerUserDto.userProps.adminId);
                if (!verifyAdmin) {
                    throw custom_error_1.CustomError.badRequest('Invalid administrator');
                }
                ;
            }
            try {
                const { userProps } = new user_entity_1.UserEntity(registerUserDto.userProps);
                userProps.password = configs_1.EncryptPassUser.hash(userProps.password);
                const { USER_FIRSTNAME, USER_LASTNAME, USER_EMAIL } = yield repositories_1.AuthRepository.create(userProps);
                return {
                    USER_FIRSTNAME,
                    USER_LASTNAME,
                    USER_EMAIL
                };
            }
            catch (error) {
                throw custom_error_1.CustomError.internalServer(`${error}`);
            }
            ;
        });
    }
    ;
    login(loginUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = loginUserDto;
            const emailExist = yield repositories_1.AuthRepository.findEmail(email);
            if (!emailExist) {
                throw custom_error_1.CustomError.badRequest("Email doesn't exist");
            }
            ;
            const isMatching = configs_1.EncryptPassUser.compare(password, emailExist.USER_PASSWORD);
            if (!isMatching) {
                throw custom_error_1.CustomError.badRequest("Invalid User or Password");
            }
            ;
            return {
                email: emailExist.USER_EMAIL,
                firstName: emailExist.USER_FIRSTNAME,
                lastName: emailExist.USER_LASTNAME
            };
        });
    }
    ;
}
exports.AuthService = AuthService;
;
