import 'dotenv/config';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { envs } from "./configs/envs";
import { MongoDataBase } from "./data/mongo/mongo-database";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";





const appStart = (() => {

    main();

});

async function main() {

    // initializeApp({
    //     credential: applicationDefault()
    // });

    // initializeApp()

    // console.log('applicationDefault', applicationDefault());

    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });



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