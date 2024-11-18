import { Schema, Document } from 'mongoose';

export interface UserPreference extends Document {
    userId: string;
    email: string;
    preferences: {
        marketing: boolean;
        newsletter: boolean;
        updates: boolean;
        frequency: 'daily' | 'weekly' | 'monthly' | 'never';
        channels: {
            email: boolean;
            sms: boolean;
            push: boolean;
        };
    };
    timezone: string;
    lastUpdated: Date;
    createdAt: Date;
}

export const UserPreferenceSchema = new Schema({
    userId: { type: String, required: true },
    email: { type: String, required: true },
    preferences: {
        marketing: { type: Boolean, required: true },
        newsletter: { type: Boolean, required: true },
        updates: { type: Boolean, required: true },
        frequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'never'], required: true },
        channels: {
            email: { type: Boolean, required: true },
            sms: { type: Boolean, required: true },
            push: { type: Boolean, required: true },
        },
    },
    timezone: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
});
