import { envs } from "./configs/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

const appStart = ( () => {

    main();

});

function main(){

    const port = envs.PORT;
    const routes = AppRoutes.routes

    const server = new Server(port, routes);

    server.start();
}

appStart();