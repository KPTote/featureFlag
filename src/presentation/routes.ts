import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { FeatureRoutes } from "./feature/routes";

export class AppRoutes{


    static get routes(): Router{

        const router = Router();

        router.use('/api/auth', AuthRoutes.routes)
        router.use('/api/feature/', FeatureRoutes.routes)

        return router;

    };

};