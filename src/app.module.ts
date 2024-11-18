import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from './notifications/notifications.module';
import { UserPreferencesModule } from './user-preferences/user-preferences.module';
import { ResponseService } from './common/response/response.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://armanbackdev:arman123@zigmentpr01.iqpb4.mongodb.net/APIdev?retryWrites=true&w=majority&appName=zigmentPr01'), // Your MongoDB connection URI
    NotificationsModule,
    UserPreferencesModule,
  ],
  providers: [ResponseService],
  exports: [ResponseService],
})

export class AppModule { }
