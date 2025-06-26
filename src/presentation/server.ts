import express, { Router } from 'express';
import { transforToUpper } from './middlewares/transform-to-upper.middleware';


export class Server {

    private app = express();

    constructor(
        private readonly port: number,
        private readonly routes: Router
    ){};

    async start(){

        //CORS
        const cors = require('cors');
        this.app.use(cors());


        //Middlewares
        this.app.use(express.json());
        this.app.use(transforToUpper)

        //Routes
        this.app.use(this.routes)

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });

    };

};