/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserPreferencesController } from './user-preferences.controller';
import { UserPreferencesService } from './user-preferences.service';
import { UserPreferenceSchema } from './models/user-preference.model';
import { NotificationLogSchema } from '../notifications/models/notification-log.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserPreference', schema: UserPreferenceSchema },
      { name: 'NotificationLog', schema: NotificationLogSchema },
    ]),
  ],
  controllers: [UserPreferencesController],
  providers: [UserPreferencesService],
})
export class UserPreferencesModule { }
