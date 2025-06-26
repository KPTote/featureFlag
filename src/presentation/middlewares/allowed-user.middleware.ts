import { NextFunction, Request, Response } from "express";
import { AuthRepository } from "../../data/repositories";
import { CustomError } from "../../domain/errors/custom.error";
import { UserRestrictionsService } from "../services";

export const isAllowedUser = async (req: Request, res: Response, next: NextFunction) => {

    const { email = '' } = req.headers;

    try {     

        const user = await AuthRepository.findByEmail(email as string);

        if (!user) {
            res.status(401).json({ error: `User don't exist` });
            return;
        };

        const restrictions = new UserRestrictionsService();

        const isAllowed = restrictions.checkRestrictions({
            typeUser: user.typeUser,
            url: req.url,
            method: req.method
        });

        if (!isAllowed) {
            res.status(401).json({ error: 'Action not allowed' });
            return;
        }

        next();



    } catch (error) {
        throw CustomError.internalServer(`${error}`);
    };


};



