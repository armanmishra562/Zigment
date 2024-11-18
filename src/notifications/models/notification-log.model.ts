import { Schema, Document } from 'mongoose';

export interface NotificationLog extends Document {
    userId: string;
    type: 'marketing' | 'newsletter' | 'updates';
    channel: 'email' | 'sms' | 'push';
    status: 'pending' | 'sent' | 'failed';
    sentAt?: Date;
    failureReason?: string;
    metadata: Record<string, any>;
}

export const NotificationLogSchema = new Schema({
    userId: { type: String, required: true },
    type: { type: String, enum: ['marketing', 'newsletter', 'updates'], required: true },
    channel: { type: String, enum: ['email', 'sms', 'push'], required: true },
    status: { type: String, enum: ['pending', 'sent', 'failed'], required: true },
    sentAt: { type: Date },
    failureReason: { type: String },
    metadata: { type: Object },
});
