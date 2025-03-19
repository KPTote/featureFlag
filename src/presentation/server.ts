import express, { Router } from 'express';

export class Server {

    private app = express();

    constructor(
        private readonly port: number,
        private readonly routes: Router
    ){};

    async start(){

        //Middlewares
        this.app.use(express.json());

        //Routes
        this.app.use(this.routes)

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });

    };

};