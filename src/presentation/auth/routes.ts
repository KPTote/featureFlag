import { Router } from "express";
import { UserLogService } from "../services";
import { AuthService } from "../services/auth/auth.service";
import { InsertIntoLogService } from "../services/user-log/insert-into-log.service";
import { AuthController } from "./controller";


export class AuthRoutes {


    static get routes(): Router {

        const router = Router();

        const userLogService = new UserLogService();
        const insertIntoLogService = new InsertIntoLogService(userLogService);
    
        const authService = new AuthService(insertIntoLogService);
        const controller = new AuthController(authService);


        router.post('/login', controller.login);
        router.post('/register', controller.register);


        return router;

    };

};