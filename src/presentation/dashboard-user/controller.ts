import { Request, Response } from "express";
import { CustomError } from '../../domain/errors/custom.error';
import { DashboardUserService } from './../services/';


export class DashboardUserController {

    constructor(
        private readonly dashboardUserService: DashboardUserService
    ) { };

    public getAllUsers = (req: Request, res: Response) => {

        this.dashboardUserService.getAllUsers()
            .then(users => res.json(users))
            .catch(error => this.handlerError(error, res));

    };

    public getUserByAdmin = (req: Request, res: Response) => {

        this.dashboardUserService.getUsersByAdmin(req.body.emailAdmin)
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