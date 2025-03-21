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
exports.DashboardUserService = void 0;
const repositories_1 = require("../../../data/repositories");
const custom_error_1 = require("../../../domain/errors/custom.error");
class DashboardUserService {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield repositories_1.DashboardUserRepository.getAllUsers();
            }
            catch (error) {
                throw custom_error_1.CustomError.internalServer(`${error}`);
            }
        });
    }
    ;
    getUsersByAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield repositories_1.DashboardUserRepository.getUsersByAdmin(id);
            }
            catch (error) {
            }
        });
    }
    ;
}
exports.DashboardUserService = DashboardUserService;
;
