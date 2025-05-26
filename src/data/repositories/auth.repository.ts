import { User } from "../../interfaces/user.interface";
import { prisma } from "../postgres-client";
import { UserModel } from './../mongo/models/user.model';



export class AuthRepository {


    static async create(userProps: User) {

        console.log(userProps);

        return await UserModel.insertOne({
            firstName: userProps.firstName ?? '',
            lastName: userProps.lastName ?? '',
            password: userProps.password ?? '',
            email: userProps.email ?? '',
            typeUser: userProps.typeUser ?? '',
            managedBy: userProps.managedBy,
            profile: userProps.profile
        });

    };

    static async findByEmail(email: string) {
        return await UserModel.findOne({
            email
        });
    };

    static async findById(id: number) {
        return await prisma.fT_USER.findUnique({
            where: {
                USER_ID: id
            }
        });
    };

};