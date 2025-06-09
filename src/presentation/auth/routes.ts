import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { AuthService } from "../services/auth/auth.service";
import { AuthController } from "./controller";


export class AuthRoutes {


    static get routes(): Router {

        const router = Router();

        const authService = new AuthService();
        const controller = new AuthController(authService);


        router.post('/login', controller.login);
        router.post('/register', [AuthMiddleware.validateJWT], controller.register);
        // router.post('/register', controller.register);


        return router;

    };

};