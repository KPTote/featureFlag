import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../configs";
import { AuthRepository } from "../../data/repositories";
import { CustomError } from "../../domain/errors/custom.error";

export class AuthMiddleware {


    static async validateJWT(req: Request, res: Response, next: NextFunction) {

        const authorization = req.header('Authorization');
        if (!authorization) {
            res.status(401).json({ error: 'No token provided' });
            return;
        };

        if (!authorization.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Invalid Bearer token' });
            return;
        };

        const token = authorization.split(' ').at(1) ?? '';


        try {

            const payload = await JwtAdapter.validateToken<{ email: string, exp: any }>(token);

            const expTime = new Date(payload?.exp * 1000);

            if (new Date() > expTime) {
                res.status(401).json({ error: 'Token expired' });
                return;
            };

            if (!payload) {
                res.status(401).json({ error: 'Invalid token' });
                return;
            };

            const user = await AuthRepository.findByEmail(payload.email);

            if (!user) {
                res.status(401).json({ error: `User don't exist` });
                return;
            };

            req.headers.email = payload.email;
            next();



        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        };
    };




}; 