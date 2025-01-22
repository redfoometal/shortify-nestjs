import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UrlModule } from './url/url.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client'),
        }),
        DatabaseModule,
        UrlModule,
        AnalyticsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
