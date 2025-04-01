import { Request, Response } from "express";
import { CreateFeatureDto, UpdateFeatureDto } from "../../domain/dtos";
import { CustomError } from "../../domain/errors/custom.error";
import { CreateFeatureService, DeleteFeatureService, GetFeatureService, UpdateFeatureService } from "../services";





export class FeatureController {

    constructor(
        private createFeatureService: CreateFeatureService,
        private updateFeatureService: UpdateFeatureService,
        private getFeatureService: GetFeatureService,
        private deleteFeatureService: DeleteFeatureService

    ) { };

    public getAllFeatures = (req: Request, res: Response) => {

        const { email = '' } = req.headers;


        this.getFeatureService.getAllFeatures(email as string)
            .then(features => res.json(features))
            .catch(error => this.handlerError(error, res));

    };

    public getFeature = (req: Request, res: Response) => {

        const id = Number(req.params.id);

        this.getFeatureService.getFeature(id)
            .then(feature => res.json(feature))
            .catch(error => this.handlerError(error, res));

    };

    public createFeature = (req: Request, res: Response) => {

        const { email = '' } = req.headers;

        const [error, createFeatureDto] = CreateFeatureDto.create(req.body);

        if (error) {
            res.status(400).json({ error });
            return;
        };

        this.createFeatureService.createFeature(createFeatureDto!, email as string)
            .then(feature => res.json(feature))
            .catch(error => this.handlerError(error, res));


    };


    public updateFeature = (req: Request, res: Response) => {


        const id = Number(req.params.id);
        const { email = '' } = req.headers;

        const [error, updateFeatureDto] = UpdateFeatureDto.update(req.body);

        if (error) {
            res.status(400).json({ error });
            return;
        };


        this.updateFeatureService.updateFeature(updateFeatureDto!, id, email as string)
            .then(feature => res.json(feature))
            .catch(error => this.handlerError(error, res));

    };


    public deleteFeature = (req: Request, res: Response) => {

        const { email = '' } = req.headers;
        const id = Number(req.body.id);

        this.deleteFeatureService.deleteFeature(id, email as string)
            .then(feature => res.json(feature))
            .catch(error => this.handlerError(error, res));
    };

    private handlerError = (error: unknown, res: Response) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        };

        return res.status(500).json({ error: 'Internal server error' })

    };

};