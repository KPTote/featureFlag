import { Router } from "express";
import { CreateFeatureService, FeatureLogService, UpdateFeatureService } from "../services";
import { DeleteFeatureService } from '../services/feature/delete-feature.service';
import { GetFeatureService } from '../services/feature/get-feature.service';
import { FeatureController } from './controller';


export class FeatureRoutes {

    static get routes(): Router{

        const router = Router();

        const featureLogService = new FeatureLogService();

        const createFeatureService = new CreateFeatureService(featureLogService);
        const updateFeatureService = new UpdateFeatureService(featureLogService);
        const getFeatureService = new GetFeatureService();
        const deleteFeatureService = new DeleteFeatureService(featureLogService)
        const featureController = new FeatureController(
            createFeatureService, 
            updateFeatureService,
            getFeatureService,
            deleteFeatureService
        );

        router.post('/', featureController.createFeature);
        router.put('/:id', featureController.updateFeature);
        router.post('/delete-feature/', featureController.deleteFeature);
        router.get('/', featureController.getAllFeatures);
        router.get('/:id', featureController.getFeature);

        return router;

    };


};