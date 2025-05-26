import mongoose from "mongoose";

const userLogSchema = new mongoose.Schema({
    details: {
        type: String,
        required: [true, 'Details is required']
    },
    executedBy: {
        type: String,
        required: [true, 'Executed by information is required']
    }
});

export const UserLogSchema = mongoose.model('UserLog', userLogSchema);