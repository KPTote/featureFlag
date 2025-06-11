import { dbFS } from "../../app";
import { User } from "../../interfaces/user.interface";



export class AuthRepository {


    static async create(userProps: User) {

        return await dbFS.collection('users').add({
            firstName: userProps?.firstName ?? '',
            lastName: userProps?.lastName ?? '',
            password: userProps?.password ?? '',
            email: userProps?.email ?? '',
            typeUser: userProps?.typeUser ?? '',
            managedBy: userProps?.managedBy ?? '',
            profile: userProps?.profile ?? ''
        });

    };

    static async findByEmail(email: string) {

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