import { Router } from "express";
import { DashboardUserService } from "../services";
import { DashboardUserController } from "./controller";


export class DashboardUserRoutes {


    static get routes(): Router{
        
        const router = Router();
        const dashboardService = new DashboardUserService();
        const controller = new DashboardUserController(dashboardService);

        router.get('/', controller.getAllUsers);
        router.post('/', controller.getUserByAdmin);

        return router;

    };

};