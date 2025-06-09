import { Router } from "express";
import { UserService } from "../services/user/user.service";
import { UserController } from "./controller";


export class UserRoutes{

    static get routes(): Router{

        const router = Router();
        const userService = new UserService();
        const controller = new UserController(userService);

        router.post('/change-password/', controller.changePassword);
        router.post('/delete-user', controller.delete);

        return router;

    };


}