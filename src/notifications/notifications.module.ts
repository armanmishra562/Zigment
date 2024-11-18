import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotificationLogSchema } from './models/notification-log.model'; // Ensure the import path is correct

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'NotificationLog', schema: NotificationLogSchema }]), // Register the model
    ],
    providers: [NotificationsService],
    controllers: [NotificationsController],
    exports: [NotificationsService], // Export the service if needed in other modules
})
export class NotificationsModule { }
