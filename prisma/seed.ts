import { PrismaClient } from "@prisma/client";
import { EncryptPassUser, envs } from "../src/configs";
import { ENUM_TYPE_USER } from "../src/enums";
const prisma = new PrismaClient();

async function seed() {

    await prisma.fT_USER.upsert({
        where: {
            USER_EMAIL: `${envs.USER_INIT}@bytesw.com`,
        },
        update: {},
        create: {
            USER_FIRSTNAME: envs.USER_INIT,
            USER_LASTNAME: envs.USER_INIT,
            USER_PASSWORD: EncryptPassUser.hash(envs.USER_INIT_PASS),
            USER_EMAIL: `${envs.USER_INIT}@bytesw.com`,
            USER_TYPE_USER: ENUM_TYPE_USER.USER_INIT
        }
    });


};


seed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });
