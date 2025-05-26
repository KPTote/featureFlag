import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    email: {
        type: String,
        require: [true, 'Email is required'],
        unique: true
    },
    typeUser: {
        type: String,
        require: [true, 'Type user is required'],
        enum: ['USER_MAIN', 'ADMIN', 'TESTER', 'USER_INIT']
    },
    managedBy:{
        type: String
    },
    profile: {
        type: String,
        enum: ['BANPAIS', 'BISV', 'BIPA']
    },


})


export const UserModel = mongoose.model('User', userSchema);