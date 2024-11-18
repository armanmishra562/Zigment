import { IsString, IsIn, IsNotEmpty, IsObject } from 'class-validator';

export class SendNotificationDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsIn(['marketing', 'newsletter', 'updates'])
    type: 'marketing' | 'newsletter' | 'updates';

    @IsString()
    @IsIn(['email', 'sms', 'push'])
    channel: 'email' | 'sms' | 'push';

    @IsObject()
    @IsNotEmpty()
    content: {
        subject: string;
        body: string;
    };
}
