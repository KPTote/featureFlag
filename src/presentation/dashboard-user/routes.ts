import { Router } from "express";
import { DashboardUserService } from "../services";
import { DashboardUserController } from "./controller";


export class DashboardUserRoutes {


    static get routes(): Router{
        
        const router = Router();
        const dashboardService = new DashboardUserService();
        const controller = new DashboardUserController(dashboardService);

        router.get('/', controller.getAllUsers);
        router.get('/by-admin', controller.getUserByAdmin);

        return router;

    };

};