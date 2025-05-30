import mongoose from "mongoose";

const featureLogSchema = new mongoose.Schema(
    {
        featureStatus: {
            type: String,
            required: [true, 'Action performed is required']
        },
        featureName: {
            type: String,
            required: [true, 'Feature name is required']
        },
        featureProfile: {
            type: String,
            required: [true, 'Feature profile is required']
        },
        executedBy: {
            type: String,
            required: [true, 'Feature profile is required']
        },
        dateTimeExecution: {
            type: String,
            required: [true, 'Date and time is required']
        }
    }
);

export const FeatureLogSchema = mongoose.model('FeatureLog', featureLogSchema);