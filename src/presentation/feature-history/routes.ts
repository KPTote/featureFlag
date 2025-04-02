import { Router } from "express";
import { FeatureLogService } from "../services";
import { FeatureHistoryController } from "./controller";


export class FeatureHistoryRoutes{

    static get routes(): Router{
        const router = Router();

        const featureLogService = new FeatureLogService();
        const controller = new FeatureHistoryController(featureLogService);

        router.get('/', controller.getAll);
        router.get('/by-user', controller.getAllByEmail)

        return router;
    };

};