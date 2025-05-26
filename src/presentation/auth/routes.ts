import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserLogService } from "../services";
import { AuthService } from "../services/auth/auth.service";
import { AuthController } from "./controller";


export class AuthRoutes {


    static get routes(): Router {

        const router = Router();

        const userLogService = new UserLogService();
        const authService = new AuthService(userLogService);
        const controller = new AuthController(authService);


        router.post('/login', controller.login);
        router.post('/register', [AuthMiddleware.validateJWT], controller.register);


        return router;

    };

};