import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { FeatureHistoryRoutes } from "./feature-history/routes";
import { isAllowedUser } from "./middlewares";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { UserRoutes } from "./user/routes";

export class AppRoutes{


    static get routes(): Router{

        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);

        router.use([AuthMiddleware.validateJWT]);
        router.use([isAllowedUser]);
        router.use('/api/user/', UserRoutes.routes );
        router.use('/api/feature-history/', FeatureHistoryRoutes.routes)

        return router;

    };

};