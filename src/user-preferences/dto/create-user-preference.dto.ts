import { IsBoolean, IsEmail, IsEnum, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ChannelsDto {
    @IsBoolean()
    email: boolean;

    @IsBoolean()
    sms: boolean;

    @IsBoolean()
    push: boolean;
}

export class CreateUserPreferenceDto {
    @IsString()
    userId: string;

    @IsEmail()
    email: string;

    @IsBoolean()
    marketing: boolean;

    @IsBoolean()
    newsletter: boolean;

    @IsBoolean()
    updates: boolean;

    @IsEnum(['daily', 'weekly', 'monthly', 'never'])
    frequency: 'daily' | 'weekly' | 'monthly' | 'never';

    @ValidateNested()
    @Type(() => ChannelsDto)
    channels: ChannelsDto;

    @IsString()
    timezone: string;
}
