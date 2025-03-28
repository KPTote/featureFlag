import { Router } from "express";
import { UserLogService } from "../services";
import { InsertIntoLogService } from "../services/user-log/insert-into-log.service";
import { UserService } from "../services/user/user.service";
import { UserController } from "./controller";


export class UserRoutes{

    static get routes(): Router{

        const router = Router();
        const userLogService = new UserLogService();
        const insertIntoLogService = new InsertIntoLogService(userLogService);
        const userService = new UserService(insertIntoLogService);
        const controller = new UserController(userService);

        router.put('/edit-account/:id', controller.update);
        router.post('/change-password/', controller.changePassword);
        router.delete('/', controller.delete);

        return router;

    };


}