import { envs } from "./configs/envs";
import { MongoDataBase } from "./data/mongo";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

const appStart = ( () => {

    main();

});

async function main(){

    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    const port = envs.PORT;
    const routes = AppRoutes.routes

    const server = new Server(port, routes);

    server.start();
}

appStart();