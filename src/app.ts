import 'dotenv/config';
import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
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
    credential: credential.cert({
        projectId: envs.FIREBASE_PROJECT_ID,
        clientEmail: envs.FIREBASE_CLIENT_EMAIL,
        privateKey: envs.FIREBASE_PRIVATE_KEY
    })
});

export const dbFS = getFirestore(firebaseApp);

appStart();