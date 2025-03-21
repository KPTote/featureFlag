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
exports.UpdateFeatureService = void 0;
const repositories_1 = require("../../../data/repositories");
const custom_error_1 = require("../../../domain/errors/custom.error");
const enums_1 = require("../../../enums");
class UpdateFeatureService {
    constructor() {
        this.featureForTesterUser = (feature, status) => {
            return {
                name: feature.FTRE_NAME,
                line: feature.FTRE_LINE,
                profile: feature.FTRE_PROFILE,
                statusFeature: status
            };
        };
    }
    updateFeature(updateFeatureDto, idFeature, emailUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkFeature = yield repositories_1.FeatureRepository.findById(idFeature);
            if (!checkFeature) {
                throw custom_error_1.CustomError.badRequest('Feature does not exist');
            }
            ;
            const user = yield repositories_1.AuthRepository.findEmail(emailUser);
            if (!user) {
                throw custom_error_1.CustomError.badRequest('User does not exist');
            }
            ;
            if (user.USER_TYPE_USER === enums_1.ENUM_TYPE_USER.TESTER) {
                const updateStatus = this.featureForTesterUser(checkFeature, updateFeatureDto.feature.statusFeature);
                return yield repositories_1.FeatureRepository.update(idFeature, updateStatus);
            }
            ;
            try {
                return yield repositories_1.FeatureRepository.update(idFeature, updateFeatureDto.feature);
            }
            catch (error) {
                throw custom_error_1.CustomError.internalServer(`${error}`);
            }
            ;
        });
    }
    ;
}
exports.UpdateFeatureService = UpdateFeatureService;
;
