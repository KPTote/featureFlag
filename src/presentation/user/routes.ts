import { Router } from "express";
import { UserLogService } from "../services";
import { UserService } from "../services/user/user.service";
import { UserController } from "./controller";


export class UserRoutes{

    static get routes(): Router{

        const router = Router();
        const userLogService = new UserLogService();
        const userService = new UserService(userLogService);
        const controller = new UserController(userService);

        router.put('/edit-account/:id', controller.update);
        router.post('/change-password/', controller.changePassword);
        router.post('/delete-user', controller.delete);

        return router;

    };


}