import { envs } from "../../configs";
import { MongoDataBase, UserModel } from "../indext";
import { FeatureLogSchema } from "../mongo/models/feature-log";
import { userInitData } from "./data";

const mongoStart = (async () => {


    MongoDataBase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    });

    await main();

    await MongoDataBase.disconnect();

});

 mongoStart();

async function main(){

    await UserModel.deleteMany();
    await FeatureLogSchema.deleteMany();

    await UserModel.insertOne(userInitData);

    console.log('SEEDED');

}