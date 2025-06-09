import { UserModel } from "../mongo/models/user.model";
import { prisma } from "../postgres-client";



export class UserRepository {

    static async changePassword(email: string, newPass: string){
        return await UserModel.updateOne(
            {
                email
            },
            {
                password: newPass
            }
        )
    };

    static async deleteUser(email: string){
        return await UserModel.deleteOne(
            {
                email
            }
        );
    };

    static async verifyByEmail(email: string) {

        return await UserModel.find({
            email
        })
    };

    static async verifyById(id: number) {
        return await prisma.fT_USER.findUnique({
            where: {
                USER_ID: id
            }
        });
    };

};