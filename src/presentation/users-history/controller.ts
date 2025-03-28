import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { UserLogService } from "../services";


export class UsersHistoryController {

    constructor(
        private readonly userLogService: UserLogService
    ) { }


    public getAll = (req: Request, res: Response) => {

        this.userLogService.getAll()
            .then(history => res.json(history))
            .catch(error => this.handlerError(error, res));
    };

    private handlerError = (error: unknown, res: Response) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        };

        return res.status(500).json({ error: 'Internal server error' })

    };


};