import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { FeatureLogService } from "../services";


export class FeatureHistoryController {

    constructor(
        private featureLogService: FeatureLogService
    ) { };

    public getAll = (req: Request, res: Response) => {


        this.featureLogService.getAll()
            .then(users => res.json(users))
            .catch(error => this.handlerError(error, res));


    };


    public getAllByEmail = (req: Request, res: Response) => {

        const email = req.headers.email;

        this.featureLogService.getAllByEmail(email as string)
            .then(users => res.json(users))
            .catch(error => this.handlerError(error, res));


    };

    private handlerError = (error: unknown, res: Response) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        };

        return res.status(500).json({ error: 'Internal server error' })

    };

};