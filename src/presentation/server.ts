import express, { Router } from 'express';
import { isAllowedUser } from './middlewares';


export class Server {

    private app = express();

    constructor(
        private readonly port: number,
        private readonly routes: Router
    ){};

    async start(){



        //Middlewares
        this.app.use(express.json());
        this.app.use(isAllowedUser);
        // this.app.use((req: Request, res: Response, next: NextFunction) => {

        //     console.log(req.headers);

        // });

        //Routes
        this.app.use(this.routes)

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });

    };

};