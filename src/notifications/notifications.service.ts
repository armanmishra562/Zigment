import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationLog } from './models/notification-log.model'; // Ensure the import path is correct

@Injectable()
export class NotificationsService {
    constructor(
        @InjectModel('NotificationLog') private notificationLogModel: Model<NotificationLog>, // Ensure the name matches
    ) { }

    // Simulate sending a notification
    async sendNotification(notificationDto: any): Promise<NotificationLog> {
        // Simulating notification sending (could add real integration later)
        const status = Math.random() > 0.1 ? 'sent' : 'failed'; // 90% success rate
        const newNotification = new this.notificationLogModel({
            ...notificationDto,
            status,
            sentAt: status === 'sent' ? new Date() : undefined,
            failureReason: status === 'failed' ? 'Simulated failure' : undefined,
        });
        return await newNotification.save();
    }

    // Get logs for a specific user
    async getLogs(userId: string): Promise<NotificationLog[]> {
        return await this.notificationLogModel.find({ userId }).exec();
    }

    // Get basic notification statistics
    async getStats(): Promise<any> {
        const totalNotifications = await this.notificationLogModel.countDocuments();
        const sentNotifications = await this.notificationLogModel.countDocuments({ status: 'sent' });
        const failedNotifications = await this.notificationLogModel.countDocuments({ status: 'failed' });

        return {
            total: totalNotifications,
            sent: sentNotifications,
            failed: failedNotifications,
        };
    }
}
