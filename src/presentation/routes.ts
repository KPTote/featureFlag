import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { DashboardUserRoutes } from "./dashboard-user/routes";
import { FeatureRoutes } from "./feature/routes";
import { UserRoutes } from "./user/routes";
import { UserHistoryRoutes } from "./users-history/routes";

export class AppRoutes{


    static get routes(): Router{

        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/feature/', FeatureRoutes.routes);
        router.use('/api/dashboard-user/', DashboardUserRoutes.routes);
        router.use('/api/users-history/', UserHistoryRoutes.routes );
        router.use('/api/user/', UserRoutes.routes );

        return router;

    };

};