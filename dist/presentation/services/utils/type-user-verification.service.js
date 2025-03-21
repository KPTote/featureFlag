"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeUserVerificationService = void 0;
const enums_1 = require("../../../enums");
class TypeUserVerificationService {
    verify(user) {
        const users = [
            enums_1.ENUM_TYPE_USER.ADMIN,
            enums_1.ENUM_TYPE_USER.TESTER,
            enums_1.ENUM_TYPE_USER.USER_MAIN,
        ];
        return users.includes(user);
    }
    ;
}
exports.TypeUserVerificationService = TypeUserVerificationService;
;
