import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationsModule } from './notifications/notifications.module';
import { UserPreferencesModule } from './user-preferences/user-preferences.module';
import { ApiKeyMiddleware } from './common/middleware/api-key.middleware'; // Assuming you have an API key middleware

@Module({
  imports: [
    // Load environment variables using ConfigModule
    ConfigModule.forRoot({
      isGlobal: true, // Makes config globally available
    }),

    // Connect to MongoDB using the connection URI from .env file
    MongooseModule.forRootAsync({
      imports: [ConfigModule],  // Import ConfigModule to use environment variables
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),  // Fetch MONGO_URI from .env
      }),
      inject: [ConfigService],  // Inject ConfigService to access the environment variable
    }),

    // Import other modules
    NotificationsModule,
    UserPreferencesModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply middleware if necessary (e.g., API key validation)
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  }
}
