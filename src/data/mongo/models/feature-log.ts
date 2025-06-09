import mongoose from "mongoose";

const featureLogSchema = new mongoose.Schema(
    {
        featureConfig: {
            type: Array,
            required: [true, 'Feature configuration is required']
        },
        browser: {
            type: String,
            required: [true, 'Browser is required']
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