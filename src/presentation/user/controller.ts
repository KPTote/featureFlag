import { Request, Response } from "express";
import { ChangePassDto, DeleteUserDto } from "../../domain/dtos";
import { CustomError } from "../../domain/errors/custom.error";
import { UserService } from '../services/user/user.service';


export class UserController {

    constructor(
        private readonly userService: UserService
    ) { };

    public changePassword = (req: Request, res: Response) => {

        const [error, pass] = ChangePassDto.dataValidate(req.body.email, req.body.password);

        if (error) {
            res.status(400).json({ error });
            return;
        };

        this.userService.changePassword(pass?.email!, pass?.newPass!)
            .then(changePass => res.json(changePass))
            .catch(error => this.handlerError(error, res));

    };

    public delete = (req: Request, res: Response) => {

        const [error, deleteUser] = DeleteUserDto.verifyEmail(req.body.email);
        const emailAdmin = req.headers.email?.toString();


        if (error) {
            res.status(400).json({ error });
            return;
        };

        this.userService.deleteUser(deleteUser?.email ?? '', emailAdmin ?? '')
            .then(user => res.json(user))
            .catch(error => this.handlerError(error, res));

    };


    private handlerError = (error: unknown, res: Response) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        };

        return res.status(500).json({ error: 'Internal server error' })

    };

};