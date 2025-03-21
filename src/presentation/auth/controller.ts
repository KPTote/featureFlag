import { Request, Response } from "express";
import { LoginUserDto } from "../../domain/dtos/auth/login.dto";
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { CustomError } from "../../domain/errors/custom.error";
import { AuthService } from "../services/auth/auth.service";



export class AuthController{

    constructor(
        private readonly authService: AuthService,
    ){};

    public login = (req: Request, res: Response) => {

        console.log(req);

        const {email , password } = req.body;

        const [error, loginDto] = LoginUserDto.login(email, password);

        if(error){
            res.status(400).json({error})
            return;
        };

        this.authService.login(loginDto!)
        .then( logIn => res.json(logIn))
        .catch(error => this.handlerError(error, res))

    };

    public register = (req: Request, res: Response) => {

        const [error, registerUserDto] = RegisterUserDto.create(req.body);

        if(error){
            res.status(400).json({error});
            return;
        };

        this.authService.registerUser(registerUserDto!)
        .then((user) => res.json(user))
        .catch(error => this.handlerError(error, res))

       

    };

    private handlerError = (error: unknown, res: Response) =>{



        if( error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        };

        return res.status(500).json({error: 'Internal server error'})

    };



};