import { Controller, Post, Get, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './dto/send-notification.dto';

@Controller('api/notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }

    @Post('send')
    async sendNotification(@Body() notificationDto: SendNotificationDto) {
        try {
            const notificationLog = await this.notificationsService.sendNotification(notificationDto);
            return { statusCode: HttpStatus.OK, message: 'Notification sent successfully', data: notificationLog };
        } catch (error) {
            throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Failed to send notification', error: error.message }, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':userId/logs')
    async getLogs(@Param('userId') userId: string) {
        try {
            const logs = await this.notificationsService.getLogs(userId);
            if (logs.length === 0) {
                throw new HttpException({ statusCode: HttpStatus.NOT_FOUND, message: 'No notification logs found for this user' }, HttpStatus.NOT_FOUND);
            }
            return { statusCode: HttpStatus.OK, message: 'Notification logs retrieved successfully', data: logs };
        } catch (error) {
            throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to retrieve notification logs', error: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('stats')
    async getStats() {
        try {
            const stats = await this.notificationsService.getStats();
            return { statusCode: HttpStatus.OK, message: 'Notification statistics retrieved successfully', data: stats };
        } catch (error) {
            throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to retrieve notification statistics', error: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
