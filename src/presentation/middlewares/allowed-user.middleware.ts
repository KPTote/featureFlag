import { NextFunction, Request, Response } from "express";
import { AuthRepository } from "../../data/repositories";
import { CustomError } from "../../domain/errors/custom.error";
import { ENUM_TYPE_USER } from "../../enums";
import { Paths } from "../enums/paths.enum";

export const isAllowedUser = async (req: Request, res: Response, next: NextFunction) => {

    const { email = '' } = req.headers;

    console.log(req.method);

    try {

        const user = await AuthRepository.findEmail(email as string);

        if (!user) {
            res.status(401).json({ error: `User don't exist` });
            return;
        };

        if (user.USER_TYPE_USER === ENUM_TYPE_USER.TESTER) {

            if ( !restrictedPaths(req.originalUrl, req.method) ){
                res.status(401).json({ error: 'Action not allowed' });
                return;
            }
         
        };

        next();




    } catch (error) {
        throw CustomError.internalServer(`${error}`);
    }


};

const restrictedPaths = (path: string, method: string) => {

    if (path === Paths.REGISTER) return false;
    if (path.includes(Paths.FEATURE_BASE_URL) && blockedMethods.includes(method)) return false;

    return true;


};

const blockedMethods: string[] = [
    'POST', 'DELETE'
];

