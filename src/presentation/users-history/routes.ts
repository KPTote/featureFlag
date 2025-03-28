import { Router } from "express";
import { UserLogService } from "../services";
import { UsersHistoryController } from "./controller";


export class UserHistoryRoutes{

    static get routes(): Router{

        const router = Router();
        const userService = new UserLogService();
        const controller = new UsersHistoryController(userService);

        router.get('/', controller.getAll);

        return router;

    };

};