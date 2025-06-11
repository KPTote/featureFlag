import 'dotenv/config';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { envs } from "./configs/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";





const appStart = (() => {

    main();

});

async function main() {
    const port = envs.PORT;
    const routes = AppRoutes.routes

    const server = new Server(port, routes);

    server.start();
}

const firebaseApp = initializeApp({
    credential: applicationDefault()
});

export const dbFS = getFirestore(firebaseApp);

appStart();