import { dbFS } from "../../app";
import { User } from "../../interfaces/user.interface";
import { UserModel } from "../mongo/models/user.model";



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

          const snapshot = await dbFS.collection('users').get();
  
          const getUsers: User[] = snapshot.docs.map( doc => {
              return {
                      firstName: doc.get('firstName'),
                      lastName: doc.get('lastName'),
                      password: doc.get('password'),
                      email: doc.get('email'),
                      typeUser: doc.get('typeUser'),
                      managedBy: doc.get('managedBy'),
                      profile: doc.get('profile'),
              }
          });
  
          return  getUsers.find( doc => doc.email === email )
    };



};