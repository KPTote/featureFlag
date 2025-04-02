import { NextFunction, Request, Response } from "express";

export const transforToUpper = async (req: Request, res: Response, next: NextFunction) => {

    const notTransform = ['password', 'emailAdmin', 'managedBy', 'email'];

    for (const key in req.body) {


        let value = req.body[key];

        if( typeof value === 'string' && !notTransform.includes(key)){
            req.body[key] = value.toUpperCase();
        };

    };

    next();

};